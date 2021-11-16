import './Input.css'

export default function Input({ type, name, value, onChange, placeholder, toggle, setToggle }) {

    return (
        <input className={'input'} type={type} name={name} value={value}
               onChange={({ target: { value } }) => onChange(value)}
               placeholder={placeholder}
               onClick={() => {
                   return toggle || setToggle ? setToggle(!toggle) : false
               }}/>
    )
}
