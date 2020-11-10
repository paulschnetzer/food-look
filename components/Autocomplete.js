import Autosuggest from 'react-autosuggest';
import { css } from '@emotion/core';

const autosuggest = css`
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    left: 31px;
    top: 46px;
    width: 240px;
    border: 1px solid #aaa;
    border-top: 0;
    background-color: white;
    padding: 20px;

    border-radius: 0 0 20px 20px;
  }
  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
`;

export default function Autocomplete(props) {
  const ing = props.ingArray;
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : ing.filter(
          (lang) => lang.toLowerCase().slice(0, inputLength) === inputValue,
        );
  };
  console.log(props.newUserIng);
  const onSuggestionsFetchRequested = ({ value }) => {
    props.setSuggestions(getSuggestions(value));
  };

  return (
    <div css={autosuggest}>
      <header>
        <Autosuggest
          suggestions={props.suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={() => {
            props.setSuggestions([]);
          }}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <span>{suggestion}</span>}
          inputProps={{
            placeholder: 'Add an ingredient',
            value: props.newUserIng,
            onChange: (e, { newValue }) => {
              props.setNewUserIng(newValue);
            },
          }}
        />
      </header>
    </div>
  );
}
