import { useForm } from 'react-hook-form'
import { Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { schema, cycleSchema } from './schemas'

import {
  Button,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  TaskInput,
} from './home.styles'

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<cycleSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleNewCycle(data: cycleSchema) {
    console.log('data', data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisable = !task

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
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <Button type="submit" disabled={isSubmitDisable}>
          <Play size={24} />
          Começar
        </Button>
      </form>
    </HomeContainer>
  )
}
