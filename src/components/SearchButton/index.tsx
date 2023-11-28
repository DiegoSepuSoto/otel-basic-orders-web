import './index.css'

import PropTypes from 'prop-types';

export interface SearchButtonProps {
    onClickHandler: () => Promise<void>,
    displayText: string,
    isDisabled: boolean
}

function SearchButton(props: SearchButtonProps) {
    return (
        <button
            className='button'
            disabled={props.isDisabled}
            onClick={async () => await props.onClickHandler()}
        >
            {props.displayText}
        </button>
    )
}

SearchButton.propTypes = {
    onClickHandler: PropTypes.func.isRequired,
    displayText: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};

export default SearchButton;