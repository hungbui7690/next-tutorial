'use server'

import prisma from '@/utils/db'
import { revalidatePath } from 'next/cache'

export const getAllTasks = async () => {
  return prisma.task.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const createTask = async (formData) => {
  const content = formData.get('content')

  await prisma.task.create({
    data: {
      content,
    },
  })

  revalidatePath('/tasks')
}

// 1. components/DeleteForm
export const deleteTask = async (formData) => {
  const id = formData.get('id')
  await prisma.task.delete({ where: { id } })
  revalidatePath('/tasks')
}
