const API_URL = 'http://localhost:3000'

export type Tag = {
  name: string
  color: string
}

export type Group = {
  id: string
  name: string
}

export type Experiment = {
  id: string
  name: string
  description?: string
  tags?: Tag[]
  group?: Group
  parent?: string
}

export const apiClient = {
  getExperiments: async () => {
    const response = await fetch(`${API_URL}/experiments`)
    const experiments = (await response.json()) as Experiment[]
    return experiments
  },
}
