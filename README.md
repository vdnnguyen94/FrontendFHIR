# FrontendFHIR: MasterEHR User Interface

This repository contains the official frontend for the MasterEHR project. It is a modern, responsive single-page application (SPA) built with React.

---

## 🎯 Purpose and Architecture

The primary purpose of this application is to provide a clean, simple, and intuitive user interface for interacting with the complex healthcare data ecosystem simulated by the MasterEHR project.

This frontend is designed to be a "thin client." It contains **no complex business logic** and **no direct knowledge of the HL7 FHIR standard**. Its sole responsibility is to display data and capture user input.

### Interaction with Other Applications

This application does **not** connect directly to FHIR servers, databases, or other healthcare systems. It exclusively communicates with a single, dedicated backend service: the `BackendFHIR` application.

This "Backend-for-Frontend" (BFF) architecture is a deliberate design choice that provides:
1.  **Security:** The frontend never holds credentials or has direct access to sensitive data systems.
2.  **Simplicity:** The frontend makes simple REST API calls (e.g., `POST /api/patients/transfer`). It doesn't need to know how to construct complex FHIR queries.
3.  **Abstraction:** The backend handles the complex work of talking to one or more other systems (like the LHSC and SJHC FHIR servers), allowing the frontend code to remain simple and focused on the user experience.

The diagram below shows how this frontend fits into the overall system:

```mermaid
graph TD;
    A[React Frontend (This Project)] -->|Simple REST API Calls| B[BackendFHIR Service];
    B -->|FHIR API Calls| C[Downstream Systems <br/> (e.g., FHIR Servers)];

    style A fill:#d5e8d4,stroke:#82b366,stroke-width:2px
```

---

## 🚀 Core Technologies

* **Framework**: React
* **Language**: JavaScript
* **Styling**: Material-UI (MUI) for professional, pre-built components.
* **API Communication**: Axios for clear and simple HTTP requests.
* **Package Manager**: npm

---

## 🛠️ Local Setup & Running

### Prerequisites

1.  **Node.js and npm** installed (preferably a recent LTS version).
2.  The `BackendFHIR` service must be running locally, as this frontend depends on it.

### Running the Application

1.  Clone this repository to your local machine.
2.  Navigate to the project's root directory in a terminal.
3.  Install the necessary packages:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm start
    ```
5.  The application will automatically open in your web browser, usually at `http://localhost:3000`.

The development server features "Hot Reloading," meaning that when you save a change in a file, the web page will automatically update without needing a manual refresh.

