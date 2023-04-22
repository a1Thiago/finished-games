type Game = {
  id: number
  title: string
  cover: string
  hours: number
  dateOfFinish: string | null
}

type SortType = {
  id: number
  option: string
  fn: (data: Game[]) => Game[]
}

export const sortGames = {
  addedAtAscending: (data: Game[]) => {
    data = data.sort((a: Game, b: Game) => a.id - b.id)
    return data
  },

  addedAtDescending: (data: Game[]) => {
    data = data.sort((a: Game, b: Game) => b.id - a.id)
    return data
  },

  alphabeticalAscending: (data: Game[]) => {
    data = data.sort((a: Game, b: Game) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    )
    return data
  },

  alphabeticalDescending: (data: Game[]) => {
    data = data.sort((a: Game, b: Game) =>
      b.title.toLowerCase().localeCompare(a.title.toLowerCase())
    )
    return data
  },

  hoursAscending: (data: Game[]) => {
    data = data.sort((a: Game, b: Game) => a.hours - b.hours)
    return data
  },

  hoursDescending: (data: Game[]) => {
    data = data.sort((a: Game, b: Game) => b.hours - a.hours)
    return data
  },

  dateOfFinishAscending: (data: Game[]) => {
    data = data.sort((a: Game, b: Game) => {
      const first = a?.dateOfFinish
      const second = b?.dateOfFinish
      if (!first || !second) {
        return 0
      } else {
        return Date.parse(first!) - Date.parse(second!)
      }
    })
    return data
  },

  dateOfFinishDescending: (data: Game[]) => {
    data = data.sort((a: Game, b: Game) => {
      const first = a?.dateOfFinish
      const second = b?.dateOfFinish
      if (!first || !second) {
        return 0
      } else {
        return Date.parse(second!) - Date.parse(first!)
      }
    })
    return data
  },
}

export const sortArray: SortType[] = [
  { id: 1, option: 'Added at ascending', fn: sortGames.addedAtAscending },
  { id: 2, option: 'Added at descending', fn: sortGames.addedAtDescending },
  { id: 3, option: 'Alphabetical ascending', fn: sortGames.alphabeticalAscending },
  { id: 4, option: 'Alphabetical descending', fn: sortGames.alphabeticalDescending },
  { id: 5, option: 'Hours to finish ascending', fn: sortGames.hoursAscending },
  { id: 6, option: 'Hours to finish descending', fn: sortGames.hoursDescending },
  { id: 7, option: 'Date of finish ascending', fn: sortGames.dateOfFinishAscending },
  { id: 8, option: 'Date of finish descending', fn: sortGames.dateOfFinishDescending },
]
