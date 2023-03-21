type sortArray = {
  id: number;
  option: string;
  fn: (data: []) => [];
}

const sortGames = {

  addedAtAscending: (data: []) => {
    return data
  },

  addedAtDescending: (data: []) => {

    data = data.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id))//addedAtDescending

    return data
  },

  alphabeticalAscending: (data: []) => {

    data = data.sort((a: any, b: any) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))//alphabeticalAscending

    return data
  },

  alphabeticalDescending: (data: []) => {

    data = data.sort((a: any, b: any) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()))//alphabeticalDescending

    return data
  },

  hoursAscending: (data: []) => {

    data = data.sort((a: any, b: any) => parseFloat(a.hours) - parseFloat(b.hours))//hoursAscending

    return data
  },

  hoursDescending: (data: []) => {

    data = data.sort((a: any, b: any) => parseFloat(b.hours) - parseFloat(a.hours))//hoursDescending

    return data
  },

  dateOfFinishAscending: (data: []) => {

    data = data.sort((a: any, b: any) => {

      const first = a?.dateOfFinish
      const second = b?.dateOfFinish

      if (!first || !second) {
        return 0
      } else {
        return parseFloat(first) - parseFloat(second)
      }
    })//dateOfFinishAscending

    return data
  },

  dateOfFinishDescending: (data: []) => {

    data = data.sort((a: any, b: any) => {

      const first = a?.dateOfFinish
      const second = b?.dateOfFinish

      if (!first || !second) {
        return 0
      } else {
        return parseFloat(second) - parseFloat(first)
      }
    })//dateOfFinishDescending

    return data
  }
}

export const sortArray: Array<sortArray> = [

  { id: 1, option: 'Added at ascending', fn: sortGames.addedAtAscending },
  { id: 2, option: 'Added at descending', fn: sortGames.addedAtDescending },
  { id: 3, option: 'Alphabetical ascending', fn: sortGames.alphabeticalAscending },
  { id: 4, option: 'Alphabetical descending', fn: sortGames.alphabeticalDescending },
  { id: 5, option: 'Hours to finish ascending', fn: sortGames.hoursAscending },
  { id: 6, option: 'Hours to finish descending', fn: sortGames.hoursDescending },
  { id: 7, option: 'Date of finish ascending', fn: sortGames.dateOfFinishAscending },
  { id: 8, option: 'Date of finish descending', fn: sortGames.dateOfFinishDescending }

]



