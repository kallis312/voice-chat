import { Input } from "@chakra-ui/react"

type Props = {

}

const SearchInput = (props: Props) => {

  const onSearch = (e: KeyboardEvent<HTMLImageElement> | undefined) => {
    return true
  }
  return (
    <Input onKeyDown={onSearch} type="search" placeholder='電話番号' />
  )
}

export default SearchInput