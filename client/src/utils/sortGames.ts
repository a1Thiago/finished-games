export const sortGames = {

  // return data // addedAtAscending

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

    data = data.sort((a: any, b: any) => parseFloat(b.hours) - parseFloat(a.hours))//hoursAscending

    return data
  },

  hoursDescending: (data: []) => {

    data = data.sort((a: any, b: any) => parseFloat(a.hours) - parseFloat(b.hours))//hoursDescending

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