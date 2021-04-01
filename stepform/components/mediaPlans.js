import React, { useRef, useState } from "react";
import { FormField, NavButton, currFormatter } from "./stepComponents";

const channels = [
  { title: "SEO" },
  { title: "Display" },
  { title: "Social" },
  { title: "Affiliate" },
  { title: "Remarketing" },
];

export default function MediaPlans() {
  /**
   * Channel state holds data for the current page of the step form
   */
  const [channelState, setChannelState] = useState({
    budget: 0,
    radioChoice: null,
  });

  /**
   * Cumulative sum of budgets per channel
   */
  const [totalBudget, setTotalBudget] = useState(0);

  /**
   * Controls what channel page is visible
   */
  const [activeChannel, setActiveChannel] = useState(0);

  /**
   * Holds state for all form pages
   */
  const formState = useRef({
    seo: { budget: 0, radioChoice: null },
    display: { budget: 0, radioChoice: null },
    social: { budget: 0, radioChoice: null },
    affiliate: { budget: 0, radioChoice: null },
    remarketing: { budget: 0, radioChoice: null },
  });

  /**
   * Updates budget amount for the appropriate channel
   * @param {Event} e React synthetic event
   * @param {string | number} channelKey Index number of current channel
   */
  const handleRange = (e, channelKey) => {
    // coerce target value to number
    const budget = Number(e.target.value);

    // update current page state
    setChannelState((channelState) => ({ ...channelState, budget }));

    // update step form state
    formState.current[channelKey].budget = budget;

    // calculate new total budget and update application
    const newTotal = Object.values(formState.current).reduce(
      (a, b) => a + b.budget,
      0
    );
    setTotalBudget(newTotal);
  };

  /**
   *
   * @param {Event} e React synthetic event
   * @param {string} label Radio choice -> "Keep Consistent" || "Exclusive"
   * @param {string} channelKey String slug of current channel
   */
  const handleRadio = (e, label, channelKey) => {
    // update step form state
    formState.current[channelKey].radioChoice = label;

    // update current page state
    setChannelState((channelState) => ({
      ...channelState,
      radioChoice: label,
    }));
  };

  /**
   *
   * @param {Event} e React synthetic event
   * @param {string} dir Navigation direction -> "left" || "right"
   */
  const handleChannelNav = (e, dir, idx = null) => {
    e.preventDefault();

    // get index of next page. If index (idx) is passed directly use that value otherwise calculate the new index
    const newActiveChannel =
      idx !== null
        ? idx
        : (dir === "left" ? activeChannel - 1 : activeChannel + 1) %
          channels.length;
    // update current page
    setActiveChannel(newActiveChannel);

    // update current page state with existing step-form data
    const channelSlug = channels[newActiveChannel].title.toLowerCase();
    setChannelState({
      budget: formState.current[channelSlug].budget,
      radioChoice: formState.current[channelSlug].radioChoice,
    });
  };

  // Render component
  return (
    <div className="form-cont">
      <form action="">
        <input
          className="mp-form-input-text title"
          name="title"
          id="mp-name"
          type="text"
          placeholder="Your Media Plan Name"
        />
        <div className="grid-col-2 ">
          <div className="mp-form-element">
            <label className="mp-form-label" htmlFor="mp-start-date">
              Start Date
            </label>
            <input
              type="date"
              className="mp-form-input-text"
              name="date"
              id="mp-start-date"
              placeholder="DD-MM-YYYY"
            />
          </div>
          <div className="mp-form-element">
            <label className="mp-form-label" htmlFor="mp-end-date">
              End Date
            </label>
            <input
              type="date"
              className="mp-form-input-text"
              name="date"
              id="mp-end-date"
              placeholder="DD-MM-YYYY"
            />
          </div>
        </div>
        <div className="step-form-cont">
          <p className="mp-form-label">What's your budget per channel?</p>
          <div className="step-form">
            <nav className="sf-channels">
              {channels.map(({ title }, i) => {
                return (
                  <button
                    key={`sf-ch-${i}`}
                    onClick={(e) => handleChannelNav(e, null, i)}
                    className={`button ghost sf-channel${
                      activeChannel === i ? " active" : ""
                    }`}
                  >
                    {title}
                  </button>
                );
              })}
            </nav>
            <div className="sf-fields">
              <FormField
                channelState={channelState}
                handleRange={handleRange}
                channelKey={channels[activeChannel].title.toLowerCase()}
                handleRadio={handleRadio}
              />
            </div>
          </div>
        </div>
        <div className="mp-form-actions">
          <p>Total Budget: {currFormatter.format(totalBudget * 5000)}</p>
          <div>
            <NavButton
              path={"left"}
              buttonProps={{ activeChannel, handleChannelNav }}
            />
            <NavButton
              path={"right"}
              buttonProps={{ activeChannel, handleChannelNav }}
            />
          </div>
        </div>
        <div className="mp-form-actions controls">
          <button
            className={`button mp-button`}
            // onClick={(e) => handleChannelNav(e, path)}
          >
            Copy
          </button>
          <button
            className={`button mp-button`}
            // onClick={(e) => handleChannelNav(e, path)}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
