const getProperty = (convertTypes: object, type: string) => {
  if (type !== '') {
    const arr = Object.entries(convertTypes)
    const filter: [string, string[]][] = arr.filter(
      ([accept]) => accept === type
    )
    const obj = Object.fromEntries(filter)
    return obj[type]
  } else return [] as string[]
}

export default getProperty
