import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import Progress from "./progess";
import { validateUsZip } from "./zipValidation";
import "./styles.css";

const moveTypes = {
  apartment_moves: {
    label: "Apartment Moves",
    category: "Residential",
    description: "Apartment relocation",
    icon: "building",
  },
  condo_moves: {
    label: "Condo Moves",
    category: "Residential",
    description: "Condo relocation",
    icon: "building",
  },
  senior_moves: {
    label: "Senior Moves",
    category: "Residential",
    description: "Senior moving support",
    icon: "home",
  },
  local_moves: {
    label: "Local Moves",
    category: "Residential",
    description: "Nearby residential moves",
    icon: "home",
  },
  packing_services: {
    label: "Packing Services",
    category: "Residential",
    description: "Packing help and materials",
    icon: "box",
  },
  secure_storage: {
    label: "Secure Storage",
    category: "Residential",
    description: "Storage solutions",
    icon: "box",
  },
  specialty_movers: {
    label: "Specialty Movers",
    category: "Residential",
    description: "Unique item moves",
    icon: "box",
  },
  military_movers: {
    label: "Military Movers",
    category: "Residential",
    description: "Military relocation",
    icon: "map",
  },
  household_movers: {
    label: "Household Movers",
    category: "Long Distance",
    description: "Full household moves",
    icon: "home",
  },
  commercial_movers: {
    label: "Commercial Movers",
    category: "Long Distance",
    description: "Business moving services",
    icon: "building",
  },
  cross_country: {
    label: "Cross Country Movers",
    category: "Long Distance",
    description: "Long distance relocation",
    icon: "truck",
  },
  coast_to_coast: {
    label: "Coast to Coast Moving",
    category: "Long Distance",
    description: "Coast-to-coast relocation",
    icon: "truck",
  },
  cross_state: {
    label: "Cross State Moving",
    category: "Long Distance",
    description: "Across state lines",
    icon: "map",
  },
  long_haul: {
    label: "Long Haul Movers",
    category: "Long Distance",
    description: "Long-haul moving",
    icon: "truck",
  },
  interstate_moving: {
    label: "Interstate Moving",
    category: "Long Distance",
    description: "Interstate relocation",
    icon: "map",
  },
  international: {
    label: "International Movers",
    category: "Long Distance",
    description: "Country to country moves",
    icon: "globe",
  },
  nationwide_moving: {
    label: "Nationwide Moving",
    category: "Long Distance",
    description: "Nationwide relocation",
    icon: "map",
  },
  state_to_state: {
    label: "State to State Moving",
    category: "Long Distance",
    description: "State-to-state service",
    icon: "map",
  },
  long_distance_relocations: {
    label: "Long Distance Relocations",
    category: "Corporate",
    description: "Corporate long distance moves",
    icon: "truck",
  },
  employee_relocation: {
    label: "Employee Relocation",
    category: "Corporate",
    description: "Employee relocation support",
    icon: "building",
  },
  office_relocation: {
    label: "Office Relocation",
    category: "Corporate",
    description: "Office moving workflow",
    icon: "building",
  },
  warehouse_services: {
    label: "Warehouse Services",
    category: "Corporate",
    description: "Warehouse moving support",
    icon: "box",
  },
  commercial_storage: {
    label: "Commercial Storage",
    category: "Corporate",
    description: "Business storage",
    icon: "box",
  },
  packing_unpacking: {
    label: "Packing and Unpacking",
    category: "Corporate",
    description: "Business packing services",
    icon: "box",
  },
  specialized_transportation: {
    label: "Specialized Transportation",
    category: "Corporate",
    description: "Specialized transport",
    icon: "truck",
  },
  logistics: {
    label: "Logistics",
    category: "Corporate",
    description: "Logistics coordination",
    icon: "map",
  },
};

const residenceTypes = {
  house: {
    label: "a house",
    moveType: "household_movers",
    icon: "home-card",
  },
  condo: {
    label: "a condo",
    moveType: "condo_moves",
    icon: "condo-card",
  },
  apartment: {
    label: "an apartment",
    moveType: "apartment_moves",
    icon: "apartment-card",
  },
  other: {
    label: "none of these",
    moveType: "specialty_movers",
    icon: "other-card",
  },
};

const moveSizes = {
  few_items: {
    label: "a few items",
    blocks: 1,
  },
  two_bedrooms: {
    label: "2 bedrooms",
    blocks: 2,
  },
  three_bedrooms: {
    label: "3 bedrooms",
    blocks: 3,
  },
  four_plus_bedrooms: {
    label: "4+ bedrooms",
    blocks: 4,
  },
};

const moveTypesThatNeedSize = [
  "apartment_moves",
  "condo_moves",
  "senior_moves",
  "local_moves",
  "household_movers",
  "cross_country",
  "coast_to_coast",
  "cross_state",
  "long_haul",
  "interstate_moving",
  "international",
  "nationwide_moving",
  "state_to_state",
];

const moveTypesWithEstimate = [
  "apartment_moves",
  "condo_moves",
  "household_movers",
];

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromDateValue(value) {
  if (!value) {
    return new Date();
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getCalendarDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - firstDay.getDay() + 1;
    const displayDay =
      dayNumber < 1
        ? daysInPreviousMonth + dayNumber
        : dayNumber > daysInMonth
          ? dayNumber - daysInMonth
          : dayNumber;
    const date = new Date(year, month, dayNumber);

    return {
      displayDay,
      inMonth: dayNumber >= 1 && dayNumber <= daysInMonth,
      value: toDateValue(date),
    };
  });
}

const initialForm = {
  move_type: "",
  residence_type: "",
  move_size: "",
  move_date: toDateValue(new Date()),
  needs_specific_move_date: false,
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  customer_city: "",
  customer_state: "",
  customer_zip: "",
  moved_with_us_before: false,
  source_city: "",
  source_state: "",
  source_zip: "",
  destination_city: "",
  destination_state: "",
  destination_zip: "",
  international: false,
  source_country: "",
  destination_country: "",
  packing_service: false,
  boxes: false,
  storage: false,
  fragile_items: false,
  referral_coupon_code: "",
  move_notes: "",
};

function getInitialMoveType() {
  const params = new URLSearchParams(window.location.search);
  const moveType = params.get("move_type");
  return moveTypes[moveType] ? moveType : "";
}

function App() {
  const urlMoveType = getInitialMoveType();
  const [step, setStep] = useState(0);
  const [estimateState, setEstimateState] = useState({
    loading: false,
    submitted: false,
    completed: false,
    amount: null,
    quoteId: null,
    estimateAvailable: null,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [zipStatus, setZipStatus] = useState({});
  const [form, setForm] = useState({
    ...initialForm,
    move_type: urlMoveType,
    international: urlMoveType === "international",
  });

  const selectedMove = moveTypes[form.move_type];
  const isInternationalMove = form.move_type === "international";
  const needsMoveSize = moveTypesThatNeedSize.includes(form.move_type);
  const canCalculateEstimate = moveTypesWithEstimate.includes(form.move_type);
  const steps = ["Move Type", "Customer Info", "Move Details", "Services", "Preview"];

  const payload = useMemo(
    () => {
      const moveDetails = isInternationalMove
        ? {
            move_type: form.move_type,
            international: true,
            origin_city: form.source_city,
            origin_state: form.source_state,
            origin_zip_code: form.source_zip,
            country_of_residence: form.source_country,
            destination_country: form.destination_country,
            destination_city: form.destination_city,
            destination_state: form.destination_state,
            destination_zip_code: form.destination_zip,
            move_date: form.move_date,
            needs_specific_move_date: form.needs_specific_move_date,
          }
        : {
            move_type: form.move_type,
            international: false,
            moving_from_zip: form.source_zip,
            moving_to_zip: form.destination_zip,
            move_date: form.move_date,
            needs_specific_move_date: form.needs_specific_move_date,
          };

      return {
        customer: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.customer_city,
          state: form.customer_state,
          moved_with_us_before: form.moved_with_us_before,
        },
        move_details: moveDetails,
        move_profile: {
          residence_type: form.residence_type,
          move_size: form.move_size,
        },
        additional_services: {
          packing_service: form.packing_service,
          boxes: form.boxes,
          storage: form.storage,
          fragile_items: form.fragile_items,
          referral_coupon_code: form.referral_coupon_code,
          move_notes: form.move_notes,
        },
      };
    },
    [form, isInternationalMove],
  );

  function update(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "move_type"
        ? {
            international: value === "international",
            move_size: moveTypesThatNeedSize.includes(value) ? current.move_size : "",
          }
        : {}),
    }));
    setValidationErrors((current) => ({ ...current, [name]: "" }));
    setZipStatus((current) => ({ ...current, [name]: "" }));
  }

  function updateResidenceType(key) {
    setForm((current) => ({
      ...current,
      residence_type: key,
      move_size: current.residence_type === key ? current.move_size : "",
    }));
  }

  async function validateZipCode(name, label) {
    const value = form[name].trim();

    if (!value) {
      return "Please provide a ZIP code.";
    }

    if (!/^\d{5}$/.test(value)) {
      return "ZIP code must be 5 digits.";
    }

    setZipStatus((current) => ({ ...current, [name]: "Checking ZIP..." }));

    try {
      const result = await validateUsZip(value);

      if (!result.valid) {
        return result.message || "Please enter a valid U.S. ZIP code.";
      }

      if (result.state === "AK") {
        return "Sorry, we do not have any agents in Alaska.";
      }

      if (result.state === "HI") {
        return "Sorry, we do not have any agents in Hawaii.";
      }

      setZipStatus((current) => ({ ...current, [name]: `${label} ZIP verified.` }));
      return "";
    } catch (error) {
      return "Could not validate this ZIP right now.";
    }
  }

  async function validateCurrentStep() {
    if (step === 0) {
      return Boolean(form.move_type && (!needsMoveSize || form.move_size));
    }

    if (step !== 2 || isInternationalMove) {
      return true;
    }

    // ZIP validation is temporarily disabled.
    // Re-enable this block when the ZIP validation API/key is ready.
    return true;

    /*
    const errors = {
      source_zip: await validateZipCode("source_zip", "Origin"),
      destination_zip: await validateZipCode("destination_zip", "Destination"),
    };

    if (
      !errors.source_zip &&
      !errors.destination_zip &&
      form.source_zip.slice(0, 2) === form.destination_zip.slice(0, 2)
    ) {
      errors.destination_zip =
        "This looks like a local move. National Van Lines is focused on long distance moves.";
    }

    setValidationErrors(errors);
    return !Object.values(errors).some(Boolean);
    */
  }

  async function next() {
    const isValid = await validateCurrentStep();

    if (!isValid) {
      return;
    }

    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function previous() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function submitWorkflow() {
    setEstimateState({
      loading: true,
      submitted: false,
      completed: false,
      amount: null,
      quoteId: null,
      estimateAvailable: canCalculateEstimate,
    });

    window.setTimeout(() => {
      if (!canCalculateEstimate) {
        setEstimateState({
          loading: false,
          submitted: false,
          completed: true,
          amount: null,
          quoteId: null,
          estimateAvailable: false,
        });
        return;
      }

      const baseEstimate = isInternationalMove ? 6200 : form.move_type?.includes("commercial") ? 4800 : 3600;
      const servicesTotal =
        (form.packing_service ? 650 : 0) +
        (form.boxes ? 180 : 0) +
        (form.storage ? 400 : 0) +
        (form.fragile_items ? 300 : 0);

      setEstimateState({
        loading: false,
        submitted: true,
        completed: false,
        amount: baseEstimate + servicesTotal,
        quoteId: `NVL-${Date.now().toString().slice(-6)}`,
        estimateAvailable: true,
      });
    }, 1400);
  }

  function completeWorkflow() {
    setEstimateState((current) => ({
      ...current,
      completed: true,
    }));
  }

  function handleFinalAction() {
    if (estimateState.submitted && !estimateState.completed) {
      completeWorkflow();
      return;
    }

    submitWorkflow();
  }

  return (
    <main>
      <Hero selectedMove={selectedMove} />
      <Progress steps={steps} step={step} />
      <section className="workflow-shell">
        {step === 0 && (
          <MoveTypeStep
            form={form}
            update={update}
            updateResidenceType={updateResidenceType}
            needsMoveSize={needsMoveSize}
          />
        )}
        {step === 1 && <CustomerStep form={form} update={update} />}
        {step === 2 && (
          <MoveDetailsStep
            form={form}
            update={update}
            isInternationalMove={isInternationalMove}
            errors={validationErrors}
            zipStatus={zipStatus}
          />
        )}
        {step === 3 && <ServicesStep form={form} update={update} />}
        {step === 4 && (
          <PreviewStep payload={payload} selectedMove={selectedMove} estimateState={estimateState} />
        )}
        <div className="actions">
          {step > 0 && (
            <button type="button" className="btn btn-secondary" onClick={previous}>
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={next}
              disabled={step === 0 && (!form.move_type || (needsMoveSize && !form.move_size))}
            >
              Next: {steps[step + 1]}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFinalAction}
              disabled={estimateState.loading || estimateState.completed}
            >
              {estimateState.loading
                ? "Calculating..."
                : estimateState.submitted
                  ? "Submit Quote Request"
                  : canCalculateEstimate
                    ? "Submit Workflow"
                    : "Submit Request"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

function Hero({ selectedMove }) {
  return (
    <header className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="eyebrow">National Van Lines</span>
        <h1>Get a quote!</h1>
        <p>{selectedMove ? selectedMove.label : "Choose the move workflow that fits your customer."}</p>
      </div>
    </header>
  );
}

function MoveTypeStep({ form, update, updateResidenceType, needsMoveSize }) {
  return (
    <div className="move-profile-step">
      <MoveSelectionBlock form={form} update={update} />

      {/*
      <section className="profile-section">
        <h2>I live in ...</h2>
        <div className="profile-grid">
          {Object.entries(residenceTypes).map(([key, item]) => (
          <button
            type="button"
              className={form.residence_type === key ? "profile-choice selected" : "profile-choice"}
              key={key}
              onClick={() => updateResidenceType(key)}
          >
              <span className={`residence-illustration ${item.icon}`} />
              <strong>{item.label}</strong>
          </button>
        ))}
      </div>
      </section>

      {form.residence_type && (
        <section className="profile-section profile-section-next">
          <h2>I have ...</h2>
          <div className="profile-grid">
            {Object.entries(moveSizes).map(([key, item]) => (
            <button
              type="button"
                className={form.move_size === key ? "profile-choice selected" : "profile-choice"}
              key={key}
                onClick={() => update("move_size", key)}
            >
                <span className={`bedroom-illustration size-${item.blocks}`}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span className={index < item.blocks ? "filled" : ""} key={index} />
                  ))}
                </span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>
      </section>
      */}

      {form.move_type && needsMoveSize && (
        <section className="profile-section profile-section-next">
          <h2>I have ...</h2>
          <div className="profile-grid">
            {Object.entries(moveSizes).map(([key, item]) => (
              <button
                type="button"
                className={form.move_size === key ? "profile-choice selected" : "profile-choice"}
                key={key}
                onClick={() => update("move_size", key)}
              >
                <span className={`bedroom-illustration size-${item.blocks}`}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span className={index < item.blocks ? "filled" : ""} key={index} />
                  ))}
                </span>
                <strong>{item.label}</strong>
              </button>
            ))}
          </div>
        </section>
      )}

      {form.move_type && (!needsMoveSize || form.move_size) && <MoveDateSection form={form} update={update} />}

    </div>
  );
}

function MoveBasics({ form, update }) {
  const [calendarMonth, setCalendarMonth] = useState(fromDateValue(form.move_date));
  const days = getCalendarDays(calendarMonth);
  const monthTitle = calendarMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  function changeMonth(offset) {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  function selectDate(value) {
    update("move_date", value);
  }

  return (
    <section className="move-basics profile-section-next">
      <div className="move-basics-grid">
        <label className="compact-input">
          <span>I'm moving from:</span>
          <input
            type="text"
            value={form.source_zip}
            onChange={(event) => update("source_zip", event.target.value)}
            placeholder="Enter a ZIP code"
            inputMode="numeric"
          />
        </label>
        <label className="compact-input">
          <span>I'm moving to:</span>
          <input
            type="text"
            value={form.destination_zip}
            onChange={(event) => update("destination_zip", event.target.value)}
            placeholder="Enter a ZIP code"
            inputMode="numeric"
          />
        </label>
      </div>

      <label className="inline-check">
        <input
          type="checkbox"
          checked={form.international}
          onChange={(event) => update("international", event.target.checked)}
        />
        <span>I am moving internationally</span>
      </label>

      <div className="calendar-block">
        <h3>When are you moving?</h3>
        <div className="calendar">
          <div className="calendar-head">
            <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">
              ‹
            </button>
            <strong>{monthTitle}</strong>
            <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">
              ›
            </button>
          </div>
          <div className="calendar-weekdays">
            {weekdayLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="calendar-days">
            {days.map((day) => (
              <button
                type="button"
                className={[
                  day.inMonth ? "" : "muted",
                  form.move_date === day.value ? "selected" : "",
                ].join(" ").trim()}
                key={day.value}
                onClick={() => selectDate(day.value)}
              >
                {day.displayDay}
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="inline-check">
        <input
          type="checkbox"
          checked={form.needs_specific_move_date}
          onChange={(event) => update("needs_specific_move_date", event.target.checked)}
        />
        <span>I need a specific move date</span>
      </label>
    </section>
  );
}

function MoveSelectionBlock({ form, update }) {
  const initialCategory = form.move_type ? moveTypes[form.move_type].category : "Residential";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const groupedMoveTypes = Object.entries(moveTypes).reduce((groups, [key, item]) => {
    const category = item.category || "Other";
    return {
      ...groups,
      [category]: [...(groups[category] || []), [key, item]],
    };
  }, {});
  const categories = Object.keys(groupedMoveTypes);
  const activeItems = groupedMoveTypes[activeCategory] || [];
  const selectedMove = moveTypes[form.move_type];

  return (
    <section className="move-selection-block profile-section-next">
      <SectionTitle title="Choose your move" subtitle="Start with a category, then select the specific service." />
      <div className="category-tabs" aria-label="Move categories">
        {categories.map((category) => (
          <button
            type="button"
            className={activeCategory === category ? "category-tab active" : "category-tab"}
            key={category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
            <span>{groupedMoveTypes[category].length}</span>
          </button>
        ))}
      </div>
      {selectedMove && (
        <div className="selected-summary">
          <span>Selected</span>
          <strong>{selectedMove.label}</strong>
        </div>
      )}
      <section className="move-type-group">
        <div className="card-grid">
          {activeItems.map(([key, item]) => (
            <button
              type="button"
              className={form.move_type === key ? "choice-card selected" : "choice-card"}
              key={key}
              onClick={() => update("move_type", key)}
            >
              <span className={`choice-icon ${item.icon}`} />
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

function CustomerStep({ form, update }) {
  return (
    <>
      <SectionTitle title="Customer info" subtitle="Capture the primary contact details." />
      <div className="form-grid">
        <Input label="First Name" name="first_name" value={form.first_name} update={update} />
        <Input label="Last Name" name="last_name" value={form.last_name} update={update} />
        <Input label="Email" name="email" value={form.email} update={update} type="email" />
        <Input label="Phone" name="phone" value={form.phone} update={update} />
        <Input label="Address" name="address" value={form.address} update={update} wide />
        <Input label="City" name="customer_city" value={form.customer_city} update={update} />
        <Input label="State" name="customer_state" value={form.customer_state} update={update} />
        <label className="inline-check wide">
          <input
            type="checkbox"
            checked={form.moved_with_us_before}
            onChange={(event) => update("moved_with_us_before", event.target.checked)}
          />
          <span>I have moved with you in the past</span>
        </label>
      </div>
    </>
  );
}

function MoveDetailsStep({ form, update, isInternationalMove, errors, zipStatus }) {
  return (
    <>
      <SectionTitle
        title="Move details"
        subtitle={
          isInternationalMove
            ? "Collect the international origin and destination details."
            : "Collect the local origin and destination ZIP codes."
        }
      />
      {isInternationalMove ? (
        <div className="split-section">
          <div>
            <h3>Origin Information</h3>
            <Input label="Origin City" name="source_city" value={form.source_city} update={update} />
            <Input label="Origin State" name="source_state" value={form.source_state} update={update} />
            <Input label="Origin ZIP Code" name="source_zip" value={form.source_zip} update={update} />
            <Input label="Country of Residence" name="source_country" value={form.source_country} update={update} />
          </div>
          <div>
            <h3>Destination Information</h3>
            <Input
              label="Destination Country"
              name="destination_country"
              value={form.destination_country}
              update={update}
            />
            <Input label="Destination City" name="destination_city" value={form.destination_city} update={update} />
            <Input label="Destination State" name="destination_state" value={form.destination_state} update={update} />
            <Input label="Destination ZIP Code" name="destination_zip" value={form.destination_zip} update={update} />
          </div>
        </div>
      ) : (
        <div className="form-grid">
          <Input
            label="Moving From ZIP"
            name="source_zip"
            value={form.source_zip}
            update={update}
            error={errors.source_zip}
            help={zipStatus.source_zip}
          />
          <Input
            label="Moving To ZIP"
            name="destination_zip"
            value={form.destination_zip}
            update={update}
            error={errors.destination_zip}
            help={zipStatus.destination_zip}
          />
        </div>
      )}
    </>
  );
}

function MoveDateSection({ form, update }) {
  const [calendarMonth, setCalendarMonth] = useState(fromDateValue(form.move_date));
  const days = getCalendarDays(calendarMonth);
  const monthTitle = calendarMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  function changeMonth(offset) {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  return (
    <section className="move-date-section">
      <div className="calendar-block">
        <h3>When are you moving?</h3>
        <div className="calendar">
          <div className="calendar-head">
            <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">
              {"<"}
            </button>
            <strong>{monthTitle}</strong>
            <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">
              {">"}
            </button>
          </div>
          <div className="calendar-weekdays">
            {weekdayLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="calendar-days">
            {days.map((day) => (
              <button
                type="button"
                className={[day.inMonth ? "" : "muted", form.move_date === day.value ? "selected" : ""]
                  .join(" ")
                  .trim()}
                key={day.value}
                onClick={() => update("move_date", day.value)}
              >
                {day.displayDay}
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="inline-check">
        <input
          type="checkbox"
          checked={form.needs_specific_move_date}
          onChange={(event) => update("needs_specific_move_date", event.target.checked)}
        />
        <span>I need a specific move date</span>
      </label>
    </section>
  );
}

function ServicesStep({ form, update }) {
  const services = [
    ["packing_service", "Do you need packing service?"],
    ["boxes", "Do you need boxes?"],
    ["storage", "Do you need storage?"],
    ["fragile_items", "Do you need fragile item handling?"],
  ];

  return (
    <>
      <SectionTitle title="Additional services" subtitle="Capture optional services before the preview." />
      <div className="service-list">
        {services.map(([name, label]) => (
          <label className="service-card" key={name}>
            <input type="checkbox" checked={form[name]} onChange={(event) => update(name, event.target.checked)} />
            <span>{label}</span>
          </label>
        ))}
      </div>
      <div className="services-extra">
        <Input
          label="Referral / Coupon Code"
          name="referral_coupon_code"
          value={form.referral_coupon_code}
          update={update}
          wide
        />
        <label className="input-wrap wide">
          <span>Tell us about your move</span>
          <textarea
            name="move_notes"
            value={form.move_notes}
            onChange={(event) => update("move_notes", event.target.value)}
          />
        </label>
      </div>
    </>
  );
}

function PreviewStep({ payload, selectedMove, estimateState }) {
  return (
    <>
      <SectionTitle title="Preview" subtitle="Review the full workflow payload before submission." />
      <div className="preview-grid">
        <PreviewCard title="Move Type" rows={[["Selected Move", selectedMove?.label || "Not selected"]]} />
        <PreviewCard title="Customer Info" rows={Object.entries(payload.customer)} />
        <PreviewCard title="Move Details" rows={Object.entries(payload.move_details)} />
        <PreviewCard title="Additional Services" rows={Object.entries(payload.additional_services)} />
      </div>
      {estimateState.loading && (
        <div className="estimate-panel loading">
          <span className="loader" />
          <div>
            <h3>Calculating your estimate</h3>
            <p>Checking move details, selected services, and route information.</p>
          </div>
        </div>
      )}
      {estimateState.submitted && estimateState.estimateAvailable !== false && (
        <div className="estimate-panel success">
          <div>
            <span className="estimate-label">Dummy Estimate</span>
            <h3>${estimateState.amount.toLocaleString()}</h3>
            <p>Quote ID: {estimateState.quoteId}</p>
          </div>
          <div className="estimate-note">
            This is a sample estimate for workflow testing only.
          </div>
        </div>
      )}
      {estimateState.completed && (
        <div className="thank-you-panel">
          <span>{estimateState.estimateAvailable === false ? "Help is on the way" : "Thank you"}</span>
          <h3>
            {estimateState.estimateAvailable === false
              ? "Help is on the way!"
              : "Your quote request has been received."}
          </h3>
          <p>
            A National Van Lines move specialist will review the details and follow up with the customer.
          </p>
        </div>
      )}
    </>
  );
}

function PreviewCard({ title, rows }) {
  return (
    <article className="preview-card">
      <h3>{title}</h3>
      {rows.map(([key, value]) => (
        <div className="preview-row" key={key}>
          <span>{key.replaceAll("_", " ")}</span>
          <strong>{typeof value === "boolean" ? (value ? "Yes" : "No") : value || "-"}</strong>
        </div>
      ))}
    </article>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function Input({ label, name, value, update, type = "text", wide = false, error = "", help = "" }) {
  return (
    <label className={wide ? "input-wrap wide" : "input-wrap"}>
      <span>{label}</span>
      <input type={type} name={name} value={value} onChange={(event) => update(name, event.target.value)} />
      {error ? <small className="field-error">{error}</small> : null}
      {!error && help ? <small className="field-help">{help}</small> : null}
    </label>
  );
}

createRoot(document.getElementById("root")).render(<App />);
