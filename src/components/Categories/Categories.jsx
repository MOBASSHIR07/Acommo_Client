import Container from '../Shared/Container'
import CategoryBox from './CategoryBox'
import { categories } from './CategoriesData.js'
const Categories = () => {
  return (
    <Container>
      <div className='pt-4 flex items-center justify-between overflow-x-auto bg-transparent sticky top-[68px] z-40 border-b border-haven-tertiary/10'>
        {categories.map(item => (
          <CategoryBox key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    </Container>
  )
}

export default Categories
