import Autosuggest from 'react-autosuggest';
import { css } from '@emotion/core';

const autosuggest = (
  top,
  left,
  width = '240px',
  padding = '10px 20px ',
  borderTop = '0',
  borderRadius = '0 0 20px 20px',
  position = 'absolute',
) => css`
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .react-autosuggest__suggestions-container--open {
    display: block;
    position: ${position};
    top: ${top};
    left: ${left};
    width: ${width};
    border: 1px solid #aaa;
    border-top: ${borderTop};
    background-color: white;
    padding: 20;
    border-radius: ${borderRadius};
    @media (max-width: 1000px) {
      left: 11px;
      top: 120px;
    }
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: ${padding};
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
`;

export default function Autocomplete(props) {
  const ingNameList = props.ingArray.map((ing) => ing.name);
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return ingNameList.filter(
      (lang) => lang.toLowerCase().slice(0, inputLength) === inputValue,
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    props.setSuggestions(getSuggestions(value));
  };

  return (
    <div
      css={autosuggest(
        props.top,
        props.left,
        props.width,
        props.padding,
        props.borderTop,
        props.borderRadius,
        props.position,
      )}
    >
      <header>
        <Autosuggest
          suggestions={props.suggestions}
          shouldRenderSuggestions={() => true}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={() => {
            props.setSuggestions([]);
          }}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <span>{suggestion}</span>}
          inputProps={{
            placeholder: 'Add an ingredient',
            value: props.input,
            onChange: (e, { newValue }) => {
              props.setInput(newValue);
            },
          }}
        />
      </header>
    </div>
  );
}
