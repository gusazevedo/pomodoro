import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'

import { schema, cycleSchema } from './schemas'
import { Cycle } from './interfaces'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  StartButton,
  StopButton,
  TaskInput,
} from './home.styles'

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const { register, handleSubmit, watch, reset } = useForm<cycleSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisable = !task

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDiff >= totalSeconds) {
          setCycles((prev) =>
            prev.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              }
              return cycle
            }),
          )

          setActiveCycleId(null)
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDiff)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  function handleNewCycle(data: cycleSchema) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((prev) => [...prev, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleStopCycle() {
    setActiveCycleId(null)
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        }
        return cycle
      }),
    )
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-seggestions"
            placeholder="Dê um nome para seu projeto"
            {...register('task')}
          />

          <datalist id="task-seggestions">
            <option value="Estudando" />
            <option value="Trabalhando" />
            <option value="Lendo" />
            <option value="Youtube" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            min={1}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopButton onClick={handleStopCycle}>
            <HandPalm size={24} />
            Parar
          </StopButton>
        ) : (
          <StartButton type="submit" disabled={isSubmitDisable}>
            <Play size={24} />
            Começar
          </StartButton>
        )}
      </form>
    </HomeContainer>
  )
}
