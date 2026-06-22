import React from "react";
import "./progess.css";

export default function Progress({ steps, step }) {
  const progress = steps.length > 1 ? (step / (steps.length - 1)) * 100 : 0;

  return React.createElement(
    "nav",
    { className: "progress-bar", "aria-label": "Workflow progress" },
    React.createElement(
      "div",
      { className: "progress-inner" },
      React.createElement(
        "div",
        { className: "progress-track", "aria-hidden": "true" },
        React.createElement("span", {
          className: "progress-fill",
          style: { width: `${progress}%` },
        }),
        React.createElement(
          "span",
          { className: "progress-truck", style: { left: `${progress}%` } },
          React.createElement(
            "svg",
            { viewBox: "0 0 72 38", "aria-hidden": "true", focusable: "false" },
            React.createElement("path", {
              className: "truck-body",
              d: "M4 9c0-2.2 1.8-4 4-4h35c2.2 0 4 1.8 4 4v19H4V9Z",
            }),
            React.createElement("path", {
              className: "truck-cab",
              d: "M47 14h11.2c1.1 0 2.1.5 2.8 1.4L68 24v4H47V14Z",
            }),
            React.createElement("path", {
              className: "truck-window",
              d: "M53 17h5.2l4 5H53v-5Z",
            }),
            React.createElement("circle", { className: "truck-wheel", cx: "18", cy: "30", r: "5" }),
            React.createElement("circle", { className: "truck-wheel", cx: "55", cy: "30", r: "5" }),
          ),
        ),
      ),
      steps.map((label, index) =>
        React.createElement(
          "div",
          { className: "progress-item", key: label },
          React.createElement("span", { className: index <= step ? "dot active" : "dot" }),
          React.createElement("span", { className: "progress-label" }, label),
        ),
      ),
    ),
  );
}
