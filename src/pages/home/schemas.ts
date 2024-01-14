import * as zod from 'zod'

export const schema = zod.object({
  task: zod.string().min(1, 'Informe o nome da task'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

export type cycleSchema = zod.infer<typeof schema>
