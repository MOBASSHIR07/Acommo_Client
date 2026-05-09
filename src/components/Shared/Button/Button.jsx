import PropTypes from 'prop-types'
const Button = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          px-4
          w-full
          ${outline ? 'bg-white' : 'bg-gradient-to-r from-rose-400 to-pink-500 shadow-xl shadow-rose-500/25'}
          ${outline ? 'border-rose-500' : 'border-none'}
          ${outline ? 'text-rose-500' : 'text-white'}
          ${small ? 'text-xs' : 'text-sm'}
          ${small ? 'py-2 px-4' : 'py-4 px-8'}
          ${small ? 'font-bold uppercase tracking-wider' : 'font-bold uppercase tracking-widest'}
          ${small ? 'border-[1px]' : 'border-0'}
          rounded-xl hover:scale-105 active:scale-95 transition-all duration-300
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className='
              absolute
              left-4
              top-3
            '
        />
      )}
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  icon: PropTypes.elementType,
}

export default Button
