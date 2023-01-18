export default function Register({ setCanvi }) {
    return (
      <>
        <h1>Soc el component Negre</h1>
        <button
          onClick={() => {
            setCanvi(true);
          }}
        >
          LOGIN
        </button>
      </>
    );
  }