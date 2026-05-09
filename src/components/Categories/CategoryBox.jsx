import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CategoryBox = ({ label, icon: Icon }) => {
  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams()
  const category = params.get('category');

  const navigate = useNavigate()
  const handleClick = ()=>{
    let currentQuery = label === 'All' ? {} : {category:label};
    const url = queryString.stringifyUrl({
      url:'/',
      query:currentQuery
    })
    navigate(url)
  }

  // If no category is in the URL, "All" should be selected.
  // Otherwise, the selected category should match the label.
  const selected = label === 'All' ? !category : category === label;

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-[#E84750]
        transition
        cursor-pointer
        ${
          selected
            ? 'border-[#E84750] text-[#E84750]'
            : 'border-transparent text-haven-tertiary'
        }
      `}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
