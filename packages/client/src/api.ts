import { api } from './petstore-client'

export const apiClient = {
  updatePet: async () => {
    await api.post('/pet/:petId', undefined, {
      queries: { name: 'test', status: 'available' },
      params: { petId: 12 },
    })
  },
  getPetId: async (id: number) => {
    const pet = await api.get('/pet/:petId', { params: { petId: id } })
    pet.name
    // ^?
  },
}
