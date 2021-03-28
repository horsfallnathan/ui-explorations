import React from "react";

/**
 * Instantiate new number formatter with USD settings
 */
const currFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

/**
 * Custom radio button
 * @param {any} param0 Radio button props
 * @returns React Element
 */
const Radio = ({ label, title, idx, radioValue, setRadioValue }) => {
  return (
    <div className="mp-form-element radio">
      <p className="mp-form-label">{label}</p>
      <label className="mp-radio" htmlFor={idx}>
        <input
          className="mp-form-input-text"
          name={title}
          id={idx}
          type="radio"
          checked={radioValue === label ? true : false}
          onChange={(e) => setRadioValue(e, label, title)}
        />
        <span className="radio-fill"></span>
      </label>
    </div>
  );
};

const FormField = ({ channelState, handleRange, handleRadio, channelKey }) => {
  return (
    <div key={channelKey}>
      <div className="mp-form-element">
        <label className="mp-form-label" htmlFor={channelKey}>
          Budget: {currFormatter.format(channelState.budget * 5000)}
        </label>
        <input
          name="budget"
          aria-labelledby="budget"
          type="range"
          id={channelKey}
          value={channelState.budget}
          onChange={(e) => handleRange(e, channelKey)}
          max="20"
          style={{
            "--track-fill": `${Math.abs((channelState.budget / 20) * 100)}%`,
          }}
        />
      </div>
      <Radio
        label="Keep Consistent"
        title={channelKey}
        radioValue={channelState.radioChoice}
        setRadioValue={handleRadio}
        idx={`rad-${channelKey}`}
      />
      <Radio
        radioValue={channelState.radioChoice}
        setRadioValue={handleRadio}
        label="Exclusive"
        title={channelKey}
        idx={`rad-${channelKey}-1`}
      />
    </div>
  );
};

const NavButton = ({ path, buttonProps }) => {
  const { activeChannel, handleChannelNav } = buttonProps;
  const isDisabled =
    (path === "left" && activeChannel === 0) ||
    (path === "right" && activeChannel === 4)
      ? true
      : false;
  const paths = {
    left:
      "M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z",
    right:
      "M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z",
  };
  return (
    <button
      className={`button mp-button`}
      disabled={isDisabled}
      onClick={(e) => handleChannelNav(e, path)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path fillRule="evenodd" d={paths[path]}></path>
      </svg>
    </button>
  );
};

module.exports = { FormField, NavButton, currFormatter };
