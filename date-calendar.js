/**

    `date-calendar` it's a web components providing calendar date functionality, events support build with Polymer 2.0.

    ### Example

        <date-calendar day-labels='["Su","Mo","Tu","We","Th","Fr","Sa"]'
                     disable-prev-days
                     show-days-in-month=42
                     disabled-dates="[8, 17, 29]"
                     disabled-weeks="[5]"
                     disabled-days='["Tu"]'
                     events-data="events.json">
        </date-calendar>

    ### Properties

        Property            | Type      | Default                                   | Description
        ------------------- | --------- | ------------------------------------------| -----------
        chosen              | String    | None                                      | selected day, format set to 'YYYY-MM-DD'.
        date                | Object    | {"month": NaN, "day": null, "date": d}    | The currently selected date.
        day-labels          | Array     | Full name days of the Week                | This property can be used to localize the elements day labels. Do not change the order.
        disabled-dates      | Array     | None                                      | Disable week days. Set the disabled dates. ex. disabled-dates="[4, 10, 12, 19, 30]"
        disabled-days       | Object    | None                                      | Disable week days. Set the disabled days. This will read the days from dayLabels. If you use custom dayLabels use the same values here. ex. if dayLabels default then disabled-days='["Monday", "Thursday"]'. if dayLabels custom then => day-labels='["Su","Mo","Tu","We","Th","Fr","Sa"]' disabled-days='["Mo", "Th"]'.
        disabled-in-months  | Array     | None                                      | In which month, days or weeks should be disabled. If not set the disabledDates & disabledWeeks will disabled for all months. ex. disabled-in-months="[5, 6]". The disabledDates & disabledWeeks will effective on May & June.
        disabled-weeks      | Array     | None                                      | Disable weeks, starting from 0 to 4 for default. If showDaysInMonth = 42 then total weeks = 5 ex. disabled-weeks="[3]". This will disable the 3th week.
        disable-prev-days   | Boolean   | false                                     | Disable previous month days
        event-day-color     | String    | #b56ce2                                   | Border color for the day that have more than 3 events, values can set to name, rgb or hex.
        events-file         | String    | None                                      | Specify the events json file. ex. events-data="events.json".
        first-day-of-week   | Number    | 0                                         | Set the first day of the week. Sunday is 0, Monday is 1 and so on.
        month-labels        | Array     | Full month names                          | This property can be used to localize the elements month labels.
        show-days-in-month  | Number    | 35                                        | How many day will be visible on each month, including previous and next month days.
        theme               | String    | Specify the calendar theme

    ### Styling

        Property                | Description
        ----------------------- | -----------
        --main-bg               | Calendar's main background color
        --header-bg             | Calendar's header background color
        --main-header-color     | Calendar's header color
        --header-icon-bg        | Calendar's icons background
        --header-icon-opacity   | header's icon opacity on hover event
        --labels-color          | The color of the days
        --border-width          | Calendar's border width
        --border-right-width    | Calendar's right border (if you set it to 0 then the dates will have top and bottom border)
        --border-color          | Calendar's border color
        --prev-days-bg          | Calendar's previous month dates background color
        --prev-days-color       | Calendar's previous month dates color
        --curr-days-bg          | Calendar's current month dates background
        --curr-days-color       | Calendar's current month dates color
        --next-days-bg          | Calendar's next month dates background
        --next-days-color       | Calendar's next month dates color
        --disabled-color        | Calendar's disabled dates color
        --disabled-text-shadow  | Calendar's disabled dates text shadow effect
        --selected-day-bg       | Calendar's selected day background color
        --today-boxshadow-color | Calendar's current date shadow style, it's adding a small border style effect
        --selected-day-hover-bg | Calendar's selected day background color on hover

    @demo demo/index.html
*/

import '@polymer/polymer/polymer-legacy.js';
// import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
// import './mp-calendar-theme.js';

'use-strict';

class mpCalendar extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style>
            :host {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
                display: block;
                box-sizing: border-box;

                --white-color: #fff;
                --light-grey-color: #dcdcdc;
                --grey-color: #757575;
                --light-blue-color: #daecff;
                --dark-grey-color: #464545;
                --dark-blue-color: #032f62;

                --main-bg: #fff;
                --header-bg: #f7f7f7;
                --main-header-color: #757575;
                --header-text-color: #006df0;
                --header-icon-bg: #006df0;
                --header-icon-opacity: .7;

                --labels-bg: ;
                --labels-color: #757575;
                --border-width: 1px;
                --border-top-width: 1px;
                --border-right-width: 1px;
                --border-bottom-width: 1px;
                --border-left-width: 1px;
                --border-color: #eaeaea;
                --prev-days-bg: #f7f7f7;
                --prev-days-color: #a0a0a0;
                --curr-days-bg: #fff;
                --curr-days-color: #757575;
                --next-days-bg: #f1f1f1;
                --next-days-color: #a0a0a0;
                --prev-next-days-bg: rgba(241, 241, 241, .7);
                --disabled-color: rgba(117, 117, 117, .3);
                --disabled-text-shadow: 0 0 2px rgba(0, 0, 0, .25);

                --selected-day-bg: #006df0;
                --today-boxshadow-color: #006df0;
                --selected-day-color: #006df0;
                --selected-day-hover-bg: rgba(0, 109, 240, .8);

                --border-radius: 4px;

                --layout: {
                    display: flex;
                    display: -ms-flexbox;
                    display: -webkit-flex;
                };

                --layout-horizontal: {
                    @apply(--layout);

                    flex-direction: row;
                    -ms-flex-direction: row;
                    -webkit-flex-direction: row;
                };

                --layout-justified: {
                    justify-content: space-between;
                    -ms-flex-pack: justify;
                    -webkit-justify-content: space-between;
                };

                --no-selection: {
                    user-select: none;
                    -ms-user-select: none;
                    -moz-user-select: none;
                    -khtml-user-select: none;
                    -webkit-user-select: none;
                    -webkit-touch-callout: none;
                };
            }

            #content {
                width: 100%;
                margin: 0;
                background: var(--main-bg);
                border: var(--border-width) solid var(--border-color);
                border-radius: var(--border-radius);
                @apply(--no-selection);
            }

            #header {
                margin: 0;
                font-size: 17px;
                font-weight: bold;
            }

            #header > div {
                @apply(--layout);
                @apply(--layout-justified);
                width: 100%;
                color: var(--main-header-color);
                background: var(--header-bg);
                padding: 7px 0;
                border-radius: 4px 4px 0 0;
            }

            /* month selection */
            #montSelection {
                text-align-last: center;
            }
            #yearSelection {
                text-align-last: center;
            }
            #montSelection, #yearSelection {
                overflow: hidden;
                background: none;
                border: none;
                color: var(--header-text-color);
                font-size: 17px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
                font-weight: 300;
                cursor: pointer;
                position: relative;
                outline: 0;
                appearance: none;
                -ms-appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;

            }

                #montSelection option, #yearSelection option {
                    direction: ltr;
                }

            .mp-cld-labels {
                min-width: 37.5px;
                padding: 0;
                background: var(--labels-bg);
                color: var(--labels-color);
                font-weight: 300;
                border-top: var(--border-top-width) solid var(--border-color);

                @apply(--layout);
                @apply(--week-layout)
            }

            .mp-cld-main, .mp-cld-days {
                width: 100%;
                margin: 0;
                border-top: var(--border-top-width) solid var(--border-color);
            }

            .calendar-icon-left,
            .calendar-icon-right { width: 26px; height: 26px; vertical-align: middle }

            .calendar-icon-left { margin: 0 0 0 5px }
            .calendar-icon-right { margin: 0 5px 0 0 }

            .currentMonth {
                text-align: center;
            }
            .currentMonthDate, .todayDate {
                vertical-align: middle;
                position: relative;
                text-align: center;
            }

                .todayDate:hover {
                    cursor: pointer
                }

            .calendar-icon-todayDay {
                width: 20px;
                height: 20px;
                display: inline-block;
                vertical-align: sub
            }

                svg.calendar-icon-left:hover,
                svg.calendar-icon-right:hover,
                svg.calendar-icon-todayDay:hover { cursor: pointer }

                svg.calendar-icon-left,
                svg.calendar-icon-right,
                svg.calendar-icon-todayDay { fill: var(--header-icon-bg); transition: all .3s ease-in-out; }

                    svg.calendar-icon-left:hover,
                    svg.calendar-icon-right:hover,
                    svg.calendar-icon-todayDay:hover {
                        /*fill: var(--header-icon-hover-bg);*/
                        opacity: var(--header-icon-opacity);
                    }

                .show-inner-date {
                    font-size: 10px;
                    width: 20px;
                    height: 60%;
                    position: absolute;
                    top: 7px;
                    right: 0;
                    left: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

            .mp-cld-labels, .mp-cld-days { margin: 0; padding-left: 0; }

            .mp-cld-label {
                width: 14.285%;
                font-size: 12px;
                color: var(--labels-color);
                line-height: 40px;
                text-align: center;
                border-right: var(--border-right-width) solid var(--border-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

                .mp-cld-label:nth-child(7), .mp-cld-day:nth-child(7) {
                    margin-right: 0;
                    border-right: 1px solid transparent;
                }

            .mp-cld-week {
                border-top: var(--border-top-width) solid var(--border-color);
                position: relative
            }

                .mp-cld-week:nth-child(1) {
                    border-top: none
                }

                .mp-cld-week.disabledWeek {
                    position: relative;
                    text-shadow: var(--disabled-text-shadow);
                    pointer-events: none
                }

                .mp-cld-week.disabledWeek > .mp-cld-day {
                    background: none;
                    color: var(--disabled-color);
                }

            .mp-cld-day {
                width: 14.285%;
                margin: 0;
                padding: 10px;
                font-size: 16px;
                text-align: center;
                border-right: var(--border-right-width) solid var(--border-color);
                cursor: pointer;
                display: inline-block;
                box-sizing: border-box;
                transition: all .3s ease-in-out;
            }

            .mp-cld-day.prevMonth,
            .mp-cld-day.currMonth,
            .mp-cld-day.nextMonth {
                position: relative;
                transition: background-color .22s ease-in-out;
            }

            .mp-cld-day.prevMonth {
                background: var(--prev-days-bg);
                color: var(--prev-days-color);
            }
            .mp-cld-day.currMonth {
                color: var(--curr-days-color);
            }

            .mp-cld-day.nextMonth {
                background: var(--next-days-bg);
                color: var(--next-days-color);
            }

                .mp-cld-day.prevMonth span, .mp-cld-day.currMonth span,
                .mp-cld-day.nextMonth span {
                    position: relative;
                }

            .mp-cld-day.prevMonth, .mp-cld-day.nextMonth {
                background: var(--prev-next-days-bg);
            }

                .mp-cld-day.prevMonth:hover,
                .mp-cld-day.currMonth:hover,
                .mp-cld-day.nextMonth:hover {
                    cursor: pointer;
                }

                    .mp-cld-day.prevMonth::before,
                    .mp-cld-day.currMonth::before,
                    .mp-cld-day.nextMonth::before {
                        content: '';
                        width: 5px;
                        height: 5px;
                        background: transparent;
                        margin-left: -2.5px;
                        position: absolute;
                        top: 30px;
                        left: 50%;
                        z-index: 0;
                        border-radius: 50%;
                        transition: all .5s ease-in-out;
                    }

                    .mp-cld-day.prevMonth:hover::before,
                    .mp-cld-day.currMonth:hover::before,
                    .mp-cld-day.nextMonth:hover::before {
                        background: var(--selected-day-bg);
                    }

             .mp-cld-day.today {
                position: relative;
                z-index: 5;
                box-shadow: var(--today-boxshadow-color) 0 -2px 0 0 inset
            }

            .mp-cld-day.currMonth.selected,
            .mp-cld-day.nextMonth.selected {
                background: var(--selected-day-bg);
                color: var(--white-color);
                position: relative;
                cursor: pointer;
                z-index: 5;
                transition: all .4s ease-in-out;
            }

                .mp-cld-day.currMonth.selected:hover {
                    background: var(--selected-day-hover-bg);
                }

                .mp-cld-day.currMonth.selected:hover::before {
                    background: none;
                }

            .mp-cld-day.prevMonth.disabled {
                pointer-events: none;
            }

                .mp-cld-day.prevMonth.disabled:hover {
                    background: var(--prev-days-bg);
                    border-bottom: none;
                    cursor: default;
                }

                    .mp-cld-day.disabled:hover::before {
                        background: none;
                    }

            .mp-cld-day.disabledDay {
                text-shadow: var(--disabled-text-shadow);
                color: var(--disabled-color);
                pointer-events: none
            }

            .mp-cld-number {
                position: relative;
                margin: 0;
                padding: 10px;
            }

            .mp-cld-title {
                position: absolute;
                z-index: 5;
                display: none;
                top: 35px;
                left: 0;
                padding: 5px 10px;
                background: var(--white-color);
                white-space: nowrap;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 12px;
            }

            .mp-cld-number:hover .mp-cld-title { display: block; }

            .mp-cld-title::before {
                content: '';
                position: absolute;
                top: -7.5px; left: 10px;
                width: 0;
                height: 0;
                border-left: 7.5px solid transparent;
                border-right: 7.5px solid transparent;
                border-bottom: 7.5px solid #ccc;
            }

            .mp-cld-number.eventday { font-weight: bold; color: #0080FF; }

                .mp-cld-number.eventday:hover { cursor: pointer; background: #eee; }

                .today .mp-cld-number.eventday:hover { background: #005eff; }

            .mp-cld-day .mp-cld-event, .mp-cld-day .eventLeft {
                width: 120%;
                background: #f1f1f1;
                color: #757575;
                border: 1px solid #ccc;
                padding: 0 5px;
                position: absolute;
                top: 0;
                left: 105%;
                opacity: 0;
                z-index: 100;
                visibility: hidden;
                transition: visibility 0s linear .5s, opacity .5s linear;
                box-sizing: border-box
            }

            .mp-cld-day .eventLeft {
                right: 105%;
                left: inherit;
            }

                .mp-cld-day .mp-cld-event::before,
                .mp-cld-day .mp-cld-event::after,
                .mp-cld-day .eventLeft::before,
                .mp-cld-day .eventLeft::after {
                    width: 0;
                    height: 0;
                    content: '';
                    z-index: 5;
                    position: absolute;
                    left: 50%;
                }

                .mp-cld-day .eventLeft::before,
                .mp-cld-day .eventLeft::after {
                    right: 50%;
                    left: inherit
                }

                .mp-cld-day .mp-cld-event::before {
                    border: 8px solid transparent;
                    border-right-color: #f1f1f1;
                    margin-left: -16px;
                    top: 10px;
                    left: 0;
                    z-index: 6;
                }

                .mp-cld-day .mp-cld-event::after {
                    border: 9px solid transparent;
                    border-right-color: #ccc;
                    margin-left: -17px;
                    top: 9px;
                    left: -1px;
                }

                    .mp-cld-day .eventLeft::before {
                        border: 8px solid transparent;
                        border-left-color: #f1f1f1;
                        margin-right: -16px;
                        top: 10px;
                        right: 0;
                        z-index: 6;
                    }

                    .mp-cld-day .eventLeft::after {
                        border: 9px solid transparent;
                        border-left-color: #ccc;
                        margin-right: -18px;
                        top: 9px;
                        right: 0;
                        left: inherit;
                    }

                .mp-cld-day h3.red { color: #e81c12; }
                .mp-cld-day h3.blue { color: #1153d8; }
                .mp-cld-day h3.green { color: #3c763d; }
                .mp-cld-day h3.orange { color: #e88e0f; }

                .mp-cld-day .mp-cld-event .event h3, .mp-cld-day .eventLeft .event h3 {
                    font-size: 16px;
                    margin: 10px 5px 0;
                    text-align: left;
                    line-height: 16px;
                }

                    .mp-cld-day .mp-cld-event:hover,
                    .mp-cld-day .eventLeft:hover {
                        cursor: auto;
                    }

                    .mp-cld-day .mp-cld-event .event:nth-child(1) > h3,
                    .mp-cld-day .eventLeft .event:nth-child(1) { margin-top: 8px; }

                .mp-cld-day .mp-cld-event .event,
                .mp-cld-day .eventLeft .event { position: relative; }

                .mp-cld-day .mp-cld-event .separator,
                .mp-cld-day .eventLeft .separator { width: 100%; margin: 0 0 15px; position: relative; }

                    .mp-cld-day .mp-cld-event .separator:nth-child(1n+1)::before,
                    .mp-cld-day .mp-cld-event .separator:nth-child(1n+1)::after,
                    .mp-cld-day .eventLeft .separator:nth-child(1n+1)::before,
                    .mp-cld-day .eventLeft .separator:nth-child(1n+1)::after {
                        background-color: #9e9e9e;
                        content: '';
                        height: 1px;
                        position: absolute;
                        bottom: 0;
                        width: 50%;
                        box-sizing: border-box;
                    }

                    .mp-cld-day .mp-cld-event .separator:nth-child(1n+1)::before,
                    .mp-cld-day .eventLeft .separator:nth-child(1n+1)::before {
                        background-image: -webkit-gradient(linear,right top,left top,from(#9e9e9e),to(#f1f1f1));
                        background-image: -webkit-linear-gradient(right,#9e9e9e, #f1f1f1);
                        background-image: -moz-linear-gradient(right,#9e9e9e, #f1f1f1);
                        background-image: -ms-linear-gradient(right,#9e9e9e, #f1f1f1);
                        background-image: -o-linear-gradient(right,#9e9e9e, #f1f1f1);
                        background-image: linear-gradient(right,#9e9e9e, #f1f1f1);
                        left: 0;
                    }

                    .mp-cld-day .mp-cld-event .separator:nth-child(1n+1)::after,
                    .mp-cld-day .eventLeft .separator:nth-child(1n+1)::after {
                        background-image: -webkit-gradient(linear,left top,right top,from(#9e9e9e),to(#f1f1f1));
                        background-image: -webkit-linear-gradient(left,#9e9e9e, #f1f1f1);
                        background-image: -moz-linear-gradient(left,#9e9e9e, #f1f1f1);
                        background-image: -ms-linear-gradient(left,#9e9e9e, #f1f1f1);
                        background-image: -o-linear-gradient(left,#9e9e9e, #f1f1f1);
                        background-image: linear-gradient(left,#9e9e9e, #f1f1f1);
                        right: 0;
                    }

                    .mp-cld-day .mp-cld-event .separator:last-child,
                    .mp-cld-day .eventLeft .separator:last-child { display: none; }

                    .mp-cld-day .mp-cld-event h3 i,
                    .mp-cld-day .eventLeft h3 i {
                        font-size: 11px;
                        font-style: italic;
                        font-weight: 300;
                        margin: 2px 0 0;
                        display: block;
                    }

                .mp-cld-day .mp-cld-event span,
                .mp-cld-day .eventLeft span {
                    font-size: 12px;
                    margin: 5px 5px 10px;
                    text-align: left;
                    display: block;
                }


                .mp-cld-day.prevMonth:hover .mp-cld-event,
                .mp-cld-day.prevMonth:hover .eventLeft,
                .mp-cld-day.currMonth:hover .mp-cld-event,
                .mp-cld-day.currMonth:hover .eventLeft,
                .mp-cld-day.nextMonth:hover .mp-cld-event,
                .mp-cld-day.nextMonth:hover .eventLeft {
                    opacity: 1;
                    visibility: visible;
                    transition-delay: 0s;
                }

                @media (max-width: 800px) {
                    .mp-cld-day .mp-cld-event { width: 200%; left: 115%; }
                    .mp-cld-day .eventLeft { width: 200%; right: 115%; }
                }

                @media (max-width: 414px) {
                    .mp-cld-day .mp-cld-event, .mp-cld-day .eventLeft { width: 350%; }
                    .mp-cld-day .mp-cld-event .event h3,
                    .mp-cld-day .eventLeft .event h3 { font-size: 14px; }
                }
                :host {
                    --labels-color: #777777;
                }
            </style>

            <iron-a11y-keys id="a11y" target="{{target}}" keys="up down left right tab space" on-keys-pressed="{{chosen}}"></iron-a11y-keys>

            <div id="content">
                <div id="header">
                    <div class="month-display">
                        <div id="prev-month" on-click="prevMonthHandler" style="transform: scale(1.5) rotate(90deg);">
                            <svg class="calendar-icon-left" viewBox="0 0 32 32" width="32px" height="32px">
                            <path d="M7 10l5 5 5-5z">
                            </svg>
                        </div>

                        <div id="currentMonth" class="currentMonth">
                            <span class="currentMonthDate">
                                <select id="montSelection" value="{{monthValue::change}}" title="Click to change month">
                                    <template is="dom-repeat" items="[[monthLabels]]" as="month">
                                        <option value="[[index]]">[[month]]</option>
                                    </template>
                                </select>

                                <select id="yearSelection" value="{{yearValue::change}}" title="Click to change year">
                                    <template is="dom-repeat" items="[[yearList]]" as="year">
                                        <option value="[[year]]">[[year]]</option>
                                    </template>
                                </select>
                            </span>
                            <span style="display:none;" class="todayDate" on-click="goToCurrentDate" title="Go to current date">
                                <div class="show-inner-date">{{calendarDay}}</div>
                                <svg class="calendar-icon-todayDay" viewBox="0 0 1792 1792" width="28px" height="28px">
                                    <path d="M192 1664h1408v-1024h-1408v1024zm384-1216v-288q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v288q0 14 9 23t23 9h64q14 0 23-9t9-23zm768 0v-288q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v288q0 14 9 23t23 9h64q14 0 23-9t9-23zm384-64v1280q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h128v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z"></path>
                                </svg>
                            </span>
                        </div>

                        <div id="next-month" on-click="nextMonthHandler" style="position: relative; top: -2px; transform: scale(1.5) rotate(270deg);">
                            <svg height="32px" class="calendar-icon-left" viewBox="0 0 32 32" width="32px">
                            <path d="M7 10l5 5 5-5z">
                            </svg>
                        </div>
                    </div>
                </div>
                <div id="mpCalendar">
                    <div class="mp-cld-labels">
                        <dom-repeat items="[[dayLabels]]">
                            <template>
                                <span class="mp-cld-label">[[item]]</span>
                            </template>
                        </dom-repeat>
                    </div>
                    <div id="cldDays" class="mp-cld-days"></div>
                </div>
            </div>
        `;
    }

    static get is() {
        return 'date-calendar';
    }

    static get properties() {
        return {
            /**
            * Disable previous month days
            */
            disablePrevDays: Boolean,

            /**
            * Disable next month days
            */
            disableNextDays: Boolean,

            /**
            * How many day will be visible on each month, including previous and next month days
            */
            showDaysInMonth: {
                type: Number,
                value: 42
            },

            /**
            * selected day, you also set a preselect day, format set to 'YYYY-MM-DD'.
            * ex. chosen="2017-06-23"
            */
           chosen: {
                type: String,
                notify: true,
                reflectToAttribute: true,
                observer: "_chosenHandler"
                },
            /**
            * selected day, you also set a preselect day, format set to 'YYYY-MM-DD'.
            * ex. chosen="2017-06-23"
            */
           selectedDate: {
                type: String,
                notify: true,
                reflectToAttribute: true,
                observer: "_selectedDate"
            },

            /**
            * Set the first day of the week: Sunday is 0, Monday is 1, etc.
            */
            firstDayOfWeek: {
                type: Number,
                value: 0
            },

            /**
            * This property can be used to localize the elements day labels. Do not change the order
            */
            dayLabels: {
                type: Array,
                value: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            },

            /**
            * This property can be used to localize the elements month labels.
            */
            monthLabels: {
                type: Array,
                value: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },

            /**
            * Internal property that holds the current month and year displayed.
            */
            showDate: {
                type: Object,
                value: {
                    year: null,
                    month: null,
                    day: null
                },
                readOnly: true
            },

            /**
            * The currently selected date.
            */
            date: {
                type: Object,
                value: () => {
                    var d = new Date();
                    return {
                        year: d.getFullYear(),
                        month: d.getUTCMonth() + 1,
                        day: null,
                        date: d
                    }
                },
                observer: '_dateChanged'
            },

            /**
            * Disable week days. Set the disabled dates.
            * ex. disabled-dates="[4, 10, 12, 19, 30]".
            */
            disabledDates: {
                type: Array,
                value: []
            },

            /**
            * Disable week days. Set the disabled days. This will read the days from dayLabels. If you use custom dayLabels use the same values here.
            * ex. if dayLabels default then disabled-days='["Monday", "Thursday"]'.
            * if dayLabels custom then => day-labels='["Su","Mo","Tu","We","Th","Fr","Sa"]' disabled-days='["Mo", "Th"]'.
            */
            disabledDays: {
                type: Object,
                value: []
            },

            /**
            * Disable weeks, starting from 0 to 4 for default. If showDaysInMonth = 42 then total weeks = 5
            * ex. disabled-weeks="[3]". This will disable the 3th week.
            */
            disabledWeeks: {
                type: Array,
                value: []
            },

            /**
            * Related to disabled-dates & disabled-weeks.
            * In which months, days or weeks will be disabled.
            * ex. disabled-in-months="[5, 6]". The disabled-dates & disabled-weeks will be disabled on May & June
            */
            disabledInMonths: {
                type: Array,
                value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            },

            /**
            * Set a json file that includes the events
            * ex. events-file="events.json".
            */
            eventsFile: {
                type: String,
                observer: '_loadEvents'
            },

            /**
            * Set an event object
            * ex. events-object='[{"title":"Meeting","content":"Skype call at 15:40","date":"2018-06-22","category":"red"}]'.
            */
            eventsObject: {
                type: Object,
                observer: '_loadEvents'
            },

            /**
            * Specify the color for a day that have more than 4 events.
            * Values can set to name, rgb(a) or hex
            */
            eventDayColor: {
                type: String,
                value: "#b56ce2"
            },

            /**
            * An object to keep all the events
            */
            _eventsData: {
                type: Object,
                value: {}
            },

            /**
            * Specify the calendar theme
            * available themes: light-blue, dark.
            */
            theme: {
                type: String,
                value: ""
            },

            minYear: {
                type: Number,
                value: 5
            },

            maxYear: {
                type: Number,
                value: 5
            },

            monthValue: {
                type: String,
                observer: 'setMonth'
            },

            yearValue: {
                type: String,
                observer: 'setYear'
            }
        }
    }

    constructor() {
        super();
        this.theme = "light-blue";
        this.showDaysInMonth = 42;
        this.chosen = "";
    }

    connectedCallback() {
        super.connectedCallback();
        this._addListeners();

        var labelList = JSON.parse(JSON.stringify(this.dayLabels));

        if (this.firstDayOfWeek != 0) {
            this.dayLabels = [];

            for (var i = 0; i < labelList.length; i++) {
                var dayName = (i + this.firstDayOfWeek) % 7;
                this.dayLabels.push(labelList[dayName])
            }
        }

        this.yearList = [];

        var d = new Date();
        var minYear = d.getFullYear() - this.minYear;
        var maxYear = d.getFullYear() + this.maxYear;

        for (minYear; minYear <= maxYear; minYear++) {
            this.yearList.push(minYear);
        }
    }

    disconnectedCallback() {
        this._removeListeners();
    }

    ready() {
        super.ready();

        if (this.eventsFile) {
            this._getJSON(this.eventsFile, (json) => {
                this._eventsData = json;
                this._initCalandar(this.showDate.month, this.showDate.year);
                this._checkChosen();
            });
        }
        else {
            this._initCalandar(this.showDate.month, this.showDate.year);
            this._checkChosen();
        }
        this._checkTheme();

        afterNextRender(this, () => {
            this.$.montSelection.value = this.showDate.month;
            this.$.yearSelection.value = this.showDate.year;
        });
    }

    _addListeners() {
        this.$.mpCalendar.addEventListener('click', this._selectionHandler.bind(this));
    }

    _removeListeners() {
        this.$.mpCalendar.removeEventListener('click', this._selectionHandler.bind(this));
    }

    _checkTheme() {
        switch (this.theme) {
            case 'light-blue':
                this._lightBlueTheme();
                break;
            case 'dark':
                this._darkTheme();
                break;
        }
    }

    _checkChosen() {
        if (this.chosen !== "" && this.chosen !== undefined) {
            var dateSegments = this.chosen.split("-");
            if (dateSegments.length < 3) {
                return;
            }
            var chosenDate = new Date(this.chosen);
            var chosenYear = parseInt(dateSegments[0]);
            var chosenMonth = parseInt(dateSegments[1]);
            var chosenDay = parseInt(dateSegments[2]);
            this.showDate.year = chosenYear;
            this.showDate.month = chosenMonth - 1;

            this.date = {
                year: chosenYear,
                month: chosenMonth,
                day: chosenDay,
                date: chosenDate,
                isoDate: this.chosen
            }
        }
    }

    _selectionHandler(e, dataDate) {
        if (e && e.target.getAttribute('data-date') == null) {
            return;
        }

        dataDate = e ? e.target.getAttribute("data-date") : dataDate;
        var dateSegments = dataDate.split("-");
        var dateObj = new Date(dataDate);

        this.showDate.year = parseInt(dateSegments[0]);
        this.date = {
            year: this.showDate.year,
            month: parseInt(dateSegments[1]),
            day: parseInt(dateSegments[2]),
            date: dateObj,
            isoDate: dataDate
        };
        this.chosen = dataDate;
    }

    _selectedDate(e) {
        if (e) {
            this.chosen = e;
        }
    }

    _chosenHandler(e) {
        var dateSegments = e.split("-");
        if (dateSegments.length < 3) {
            return;
        }
        var chosenDate = new Date(e);
        var chosenYear = parseInt(dateSegments[0]);
        var chosenMonth = parseInt(dateSegments[1]);
        var chosenDay = parseInt(dateSegments[2]);

        if ((chosenMonth == this.date.month) && (chosenYear == this.date.year)) {
            var selection = dom(this.$.cldDays).querySelector('.selected');
            if (selection) {
                selection.classList.remove('selected');
            }
            if (e == "" || e == null) {
                this.chosen = "";
            }
            else {
                this.chosen = e;
                var days = dom(this.$.mpCalendar).querySelectorAll('.day');

                days.forEach((e, i) => {
                    if (this.chosen == e.getAttribute('data-date')) {
                        e.classList.add('selected');
                    }
                });
                this.date.day = chosenDay;
            }
        }
        else {
            this.showDate = {
                month: chosenMonth,
                day: chosenDay,
                year: chosenYear
            };
        }
    }

    prevMonthHandler() {
        this.set('showDate.month', this.showDate.month <= 0 ? 11 : this.showDate.month - 1);
        this.set('showDate.year', this.showDate.month == 11 ? this.showDate.year - 1 : this.showDate.year);
        this.chosen = "";

        this.notifyPath('date.year', this.showDate.year);

        this.currentMonth = this.monthLabels[this.showDate.month];
        this._initCalandar(this.showDate.month, this.showDate.year);
        this.$.montSelection.value = this.showDate.month;
        this.$.yearSelection.value = this.showDate.year;
        this._fire('prevMonth');
    }

    nextMonthHandler() {
        this.set('showDate.month', this.showDate.month == 11 ? 0 : this.showDate.month + 1);
        this.set('showDate.year', this.showDate.month <= 0 ? this.showDate.year + 1 : this.showDate.year);
        this.chosen = "";

        this.notifyPath('date.year', this.showDate.year);

        this.currentMonth = this.monthLabels[this.showDate.month];
        this._initCalandar(this.showDate.month, this.showDate.year);
        this.$.montSelection.value = this.showDate.month;
        this.$.yearSelection.value = this.showDate.year;
        this._fire('nextMonth');
    }

    setMonth(month) {
        this._setShowDate({
            month: parseInt(month),
            year: this.showDate.year
        });

        this.chosen = "";
        this._initCalandar(parseInt(month), parseInt(this.$.yearSelection.value));
        this._fire('monthChanged');
    }

    setYear(year) {
        this._setShowDate({
            month: this.showDate.month - 1,
            year: parseInt(year)
        });

        this.chosen = "";
        this._initCalandar(parseInt(this.$.montSelection.value), year);
        this._fire('monthChanged');
    }

    _fire(ev, el) {
        this.dispatchEvent(new CustomEvent(ev, {
            bubbles: true,
            composed: true,
            detail: el
        }));
    }

    _dateChanged(newDate, oldDate) {
        var date = new Date();
        var month = parseInt(newDate.month) || 1;
        var year = parseInt(newDate.year) || date.getFullYear();
        var day = parseInt(newDate.day) || 1;

        this.date.month = month;
        this.date.year = year;
        this.date.day = this.date.day != null ? day : null;

        this._setShowDate({
            month: month - 1,
            year: year
        });

        this.currentMonth = this.monthLabels[this.showDate.month];
        this.calendarDay = this.date.day != null ? day : date.getDate();

        if (!!newDate && !!oldDate) {
            if (newDate.date.getUTCMonth() > oldDate.date.getUTCMonth()) {
                this._initCalandar(this.showDate.month, this.showDate.year);
                this._fire('nextMonth');
            }
            if (newDate.date.getUTCMonth() < oldDate.date.getUTCMonth()) {
                this._initCalandar(this.showDate.month, this.showDate.year);
                this._fire('prevMonth');
            }
            var eventDate = JSON.parse(JSON.stringify(this.date));
            var isoDate = eventDate.isoDate.split("-");
            eventDate.year = parseInt(isoDate[0]);
            eventDate.month = parseInt(isoDate[1]);
            eventDate.day = parseInt(isoDate[2]);
            this._fire('dateSelected', eventDate);
            this._fire('date', eventDate.isoDate);
        }

        this.$.montSelection.value = this.showDate.month;
        this.$.yearSelection.value = this.showDate.year;
    }

    goToCurrentDate(e) {
        var today = new Date();

        this.date = {
            date: today,
            day: today.getDate(),
            month: today.getUTCMonth() + 1,
            year: today.getFullYear()
        }

        this.chosen = "";
        this._initCalandar(this.showDate.month, this.showDate.year);
        this.$.montSelection.value = this.showDate.month;
        this.$.yearSelection.value = this.showDate.year;
        this._fire('currMonth');
    }

    _initCalandar(month, year) {
        var today = new Date();
        var thisDay = today.getDate();
        var thisMonth = today.getUTCMonth() + 1;
        var dayOfMonthStart = new Date(year, month, 1).getDay() == 0 ? 7 : new Date(year, month, 1).getDay(); // which day the month starts (0 - 6)
        var calendarElem = dom(this.$.mpCalendar);
        var previousMonth, previousYear, nextMonth, nextYear, previousMonthDays, disDays;

        this.$.cldDays.innerHTML = '';

        if (month === 0) {
            previousMonth = 11;
            previousYear = year - 1;
        }
        else {
            previousMonth = month - 1;
            previousYear = year
        }
        if (month === 11) {
            nextMonth = 0;
            nextYear = year + 1;
        }
        else {
            nextMonth = month + 1;
            nextYear = year;
        }

        if (month === 0) {
            previousMonthDays = this._numberOfDays(12, year);
        }
        else {
            previousMonthDays = this._numberOfDays(month, year);
        }

        var currentMonthDays = this._numberOfDays(month + 1, year);
        var nextMonthDays = this._numberOfDays(month + 2, year);

        // define default day variables
        var dayN = 1;
        var dayOfNextMonth = 1;
        var days = this.$.cldDays;

        var showDaysInMonth = this.showDaysInMonth;
        if (dayOfMonthStart >= 5 && this.showDaysInMonth < 37 && currentMonthDays > 29) {
            showDaysInMonth = 42
        }
        for (var i = 0; i < showDaysInMonth; i++) {
            var day = document.createElement('span');
            // separated into weeks
            if (i % 7 === 0) {
                var week = document.createElement('div');
                week.className += "mp-cld-week";
                week.setAttribute("week", i / 7);

                // check for disabled weeks
                if (this.disabledWeeks != "" || this.disabledInMonths != "") {
                    this.disabledInMonths.forEach((disMonth) => {
                        if (disMonth == month + 1) {
                            this.disabledWeeks.forEach((disWeek) => {
                                if (disWeek == i / 7) {
                                    week.className += " disabledWeek";
                                }
                            });
                        }
                    });
                }
            }

            if (i < (dayOfMonthStart - this.firstDayOfWeek)) {
                day.className += "mp-cld-day prevMonth";

                if (this.disablePrevDays) {
                    day.innerHTML += "&nbsp;";
                    day.className += " disabled";
                }
                else {
                    var number = this._dayNumber((previousMonthDays - dayOfMonthStart) + (i + 1 + this.firstDayOfWeek), previousMonth + 1, previousYear, day);
                }
            }

            else if (dayN <= currentMonthDays) {
                day.className += "mp-cld-day currMonth";
                var number = this._dayNumber(dayN++, month + 1, year, day);

                // If today
                if ((dayN - 1) == thisDay && month == thisMonth - 1 && this.date.year == year) {
                    day.className += " today";
                }

                // Keep the selected day on month change
                if (this.chosen) {
                    if ((dayN - 1) == this.date.day && month == month && this.date.year == year) {
                        day.className += " selected";
                    }
                }

                // check for disabled days
                if (this.disabledDays != "" && this.disabledInMonths != "") {
                    this.disabledInMonths.forEach((disMonth) => {
                        if (disMonth == month + 1) {
                            this.disabledDays.forEach((disDay, i) => {
                                this.dayLabels.forEach((labDay, d) => {
                                    if (disDay === labDay) {
                                        var date = new Date();
                                        date.setDate(d);
                                        date.setMonth(month);

                                        if (date.getFullYear() != year) {
                                            date.setYear(year);
                                        }

                                        disDays = this._getDisabledDays(d, month, year);

                                        disDays.forEach((date) => {
                                            if (date.getDate() == dayN - 1) {
                                                day.className += " disabledDay";
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    });
                }

                // check for disabled dates
                if (this.disabledDates != "" && this.disabledInMonths != "") {
                    this.disabledInMonths.forEach((disMonth) => {
                        if (disMonth == month + 1) {
                            this.disabledDates.forEach((disDay) => {
                                if (disDay == dayN - 1) {
                                    day.className += " disabledDay";
                                }
                            });
                        }
                    });
                }
            }
            else {
                day.className += "mp-cld-day nextMonth";
                if (this.disableNextDays) {
                    day.innerHTML += "&nbsp;";
                    day.className += " disabled";
                }
                else {
                    var number = this._dayNumber(dayOfNextMonth++, nextMonth + 1, nextYear, day);
                }
            }

            dom(days).appendChild(week);
            dom(week).appendChild(day);
        }
        dom(calendarElem).appendChild(days);

        if (this.eventsFile || this.eventsObject) {
            this._findAllEvents(this._eventsData);
        }
    }

    // get days number of each month
    // The month passed in is 1 for January, 2 for February and so on
    _numberOfDays(month, year) {
        return new Date(year, month, 0).getDate();
    }

    // modify each day with 2 digit number and add attributes
    _dayNumber(dayDate, month, year, dayElem) {
        var span = document.createElement('span');
        var dd = (dayDate < 10 ? '0' : '') + dayDate;
        var mm = (month < 10 ? '0' : '') + month;
        var dataDate = (year + "-" + mm + "-" + dd);

        dayElem.className += " day";
        dayElem.innerHTML += dayDate;
        dayElem.setAttribute("data-date", dataDate);
        dayElem.setAttribute("tabindex", 0);

        return dayElem;
    }

    _getDisabledDays(day, month, year) {
        var disDays = [];
        var monthDays = this._numberOfDays(month, year);

        for (var i = 0; i <= monthDays; i++) {
            var date = new Date(year, month, i, 0);
            if (date.getDay() == day) {
                disDays.push(date);
            }
        }
        return disDays;
    }

    _getJSON(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }

    _findAllEvents(events) {
        var today = new Date();
        var dd = (today.getDate() < 10 ? '0' : '') + today.getDate();
        var mm = (today.getUTCMonth() < 10 ? '0' : '') + (today.getUTCMonth() + 1);
        var isoToday = (today.getFullYear() + "-" + mm + "-" + dd);

        events.forEach((item) => {
            var selector = '.day[data-date="' + item.date + '"]';
            var result = this.$.content.querySelector(selector);
            var event = '';
            var dayEvents = [];
            var weight = 0;
            var color = '';

            if (result != undefined || result != null) {
                for (var i in events) {
                    if (events[i].date === result.getAttribute('data-date')) {
                        dayEvents.push(events[i]);
                    }
                }

                // from http://www.bootstrap-year-calendar.com/
                if (dayEvents.length <= 3) {
                    weight = 3
                }
                else {
                    result.style.boxShadow = "inset -4px 0 0 0 " + this.eventDayColor + "";
                }

                if (weight > 0) {
                    var boxShadow = '';

                    for (var i in dayEvents) {
                        if (boxShadow != '') {
                            boxShadow += ',';
                        }

                        if (dayEvents[i].date === isoToday) {
                            boxShadow += "var(--today-boxshadow-color) 0 -2px 0 0 inset, ";
                        }

                        boxShadow += 'inset -' + (parseInt(i) + 1) * weight + 'px 0 0 0 ' + ((dayEvents[i].color == undefined) ? dayEvents[i].category : dayEvents[i].color);
                    }
                    result.style.boxShadow = boxShadow;
                }

                if (result.children.length == 0) {
                    event += '<div class="mp-cld-event"><div class="event">'
                        + '<h3 class="' + item.category + '" ' + (item.color ? ('style="color:' + item.color + '"') : '') + '>' + item.title + ''
                        + '<i>' + item.date + '</i>'
                        + '</h3>'
                        + '<span>' + item.content + '</span>'
                        + '</div></div>';

                    dom(result).innerHTML += event;
                }
                else {
                    for (var i = 0; i < result.children.length; i++) {
                        event += '<span class="separator"></span><div class="event">'
                            + '<h3 class="' + item.category + '" ' + (item.color ? ('style="color:' + item.color + '"') : '') + '>' + item.title + ''
                            + '<i>' + item.date + '</i>'
                            + '</h3>'
                            + '<span>' + item.content + '</span>'
                            + '</div>';

                        dom(result.children[i]).innerHTML += event;
                    }
                }

                setTimeout(() => {
                    this.horizontallyBound(this, result.children[0]);
                });
            }
        });
    }

    // check if event falls out of the parent div
    horizontallyBound(parentDiv, childDiv) {
        var parentRect = parentDiv.getBoundingClientRect();
        var childRect = childDiv.getBoundingClientRect();

        if ((childRect.left + childRect.width) > parentRect.width) {
            childDiv.classList.remove("mp-cld-event");
            childDiv.classList.add("eventLeft");
        }
    }

    _loadEvents() {
        if (this.eventsFile) {
            this._getJSON(this.eventsFile, (json) => {
                this._eventsData = json;
                this._initCalandar(this.showDate.month, this.showDate.year);
                this._checkChosen();
            });
        }
        else {
            this._eventsData = this.eventsObject;
            this._initCalandar(this.showDate.month, this.showDate.year);
            this._checkChosen();
        }

    }

    _lightBlueTheme() {
        this.updateStyles({
            '--main-bg': '#fff',
            '--header-bg': 'transparent',
            '--main-header-color': '#777777',
            '--header-text-color': '#777777',
            '--header-icon-bg': 'rgba(6, 143, 189, .85)',
            '--header-icon-opacity': '',
            '--labels-color': '#aaaaaa',
            '--border-width': '1px',
            '--border-right-width': '0',
            '--border-color': 'rgba(6, 143, 189, .05)',
            '--prev-next-days-bg': 'transparent',
            '--prev-days-bg': '',
            '--prev-days-color': '#cccccc',
            '--curr-days-bg': '',
            '--curr-days-color': '#777777',
            '--next-days-bg': '',
            '--next-days-color': '#cccccc',
            '--disabled-color': 'rgba(6, 143, 189, .3)',
            '--disabled-text-shadow': '0 0 3px rgba(0, 0, 0, .25)',
            '--selected-day-bg': '#078dc0',
            '--today-boxshadow-color': '#077599',
            '--selected-day-hover-bg': 'rgba(6, 143, 189, .7)'
        });
    }

    _darkTheme() {
        this.updateStyles({
            '--main-bg': '#000',
            '--header-bg': '#000',
            '--main-header-color': '#fff',
            '--header-icon-bg': '#f33127',
            '--header-icon-opacity': '',
            '--labels-color': '#fff',
            '--border-width': '1px',
            '--border-color': 'rgba(255, 255, 255, .2)',
            '--prev-days-color': '#fff',
            '--curr-days-bg': '',
            '--curr-days-color': '#fff',
            '--prev-next-days-bg': 'rgba(158, 21, 14, 0.6)',
            '--next-days-color': '#fff',
            '--disabled-color': 'rgba(255, 255, 255, .3)',
            '--disabled-text-shadow': '0 0 2px rgba(255, 255, 255, .35)',
            '--selected-day-bg': '#af221b',
            '--today-boxshadow-color': '#f33127',
            '--selected-day-hover-bg': 'rgba(255, 13, 0, .5)'
        });
    }
}
customElements.define(mpCalendar.is, mpCalendar);
