import './Error.css';

export default function Error({error, setError}) {
    return (
        <div className={`error ${error ? 'active' : ''}`}>
            <div className={'error__title'}>
                <span>Sorry but {error}, please repeat</span>
                <button className={'btn'} onClick={() => {
                    setError('')
                }}>ok
                </button>
            </div>
        </div>
    )
}
