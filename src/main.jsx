import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
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

const initialForm = {
  move_type: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  customer_city: "",
  customer_state: "",
  customer_zip: "",
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
};

function getInitialMoveType() {
  const params = new URLSearchParams(window.location.search);
  const moveType = params.get("move_type");
  return moveTypes[moveType] ? moveType : "";
}

function App() {
  const urlMoveType = getInitialMoveType();
  const initialCategory = urlMoveType ? moveTypes[urlMoveType].category : "Residential";
  const [step, setStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [estimateState, setEstimateState] = useState({
    loading: false,
    submitted: false,
    completed: false,
    amount: null,
    quoteId: null,
  });
  const [form, setForm] = useState({
    ...initialForm,
    move_type: urlMoveType,
    international: urlMoveType === "international",
  });

  const selectedMove = moveTypes[form.move_type];
  const isInternationalMove = form.move_type === "international";
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
          }
        : {
            move_type: form.move_type,
            international: false,
            moving_from_zip: form.source_zip,
            moving_to_zip: form.destination_zip,
          };

      return {
        customer: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
        },
        move_details: moveDetails,
        additional_services: {
          packing_service: form.packing_service,
          boxes: form.boxes,
          storage: form.storage,
          fragile_items: form.fragile_items,
        },
      };
    },
    [form, isInternationalMove],
  );

  function update(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "move_type" ? { international: value === "international" } : {}),
    }));
  }

  function next() {
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
    });

    window.setTimeout(() => {
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
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}
        {step === 1 && <CustomerStep form={form} update={update} />}
        {step === 2 && <MoveDetailsStep form={form} update={update} isInternationalMove={isInternationalMove} />}
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
            <button type="button" className="btn btn-primary" onClick={next}>
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
                  : "Submit Workflow"}
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

function Progress({ steps, step }) {
  return (
    <nav className="progress-bar" aria-label="Workflow progress">
      <div className="progress-inner">
        {steps.map((label, index) => (
          <div className="progress-item" key={label}>
            <span className={index <= step ? "dot active" : "dot"} />
            <span className="progress-label">{label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}

function MoveTypeStep({ form, update, activeCategory, setActiveCategory }) {
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
    <>
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
    </>
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
      </div>
    </>
  );
}

function MoveDetailsStep({ form, update, isInternationalMove }) {
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
          <Input label="Moving From ZIP" name="source_zip" value={form.source_zip} update={update} />
          <Input label="Moving To ZIP" name="destination_zip" value={form.destination_zip} update={update} />
        </div>
      )}
    </>
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
      {estimateState.submitted && (
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
          <span>Thank you</span>
          <h3>Your quote request has been received.</h3>
          <p>
            A National Van Lines move specialist will review the details and follow up with the
            customer.
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

function Input({ label, name, value, update, type = "text", wide = false }) {
  return (
    <label className={wide ? "input-wrap wide" : "input-wrap"}>
      <span>{label}</span>
      <input type={type} name={name} value={value} onChange={(event) => update(name, event.target.value)} />
    </label>
  );
}

createRoot(document.getElementById("root")).render(<App />);
