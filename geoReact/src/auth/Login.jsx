export default function Login({ setCanvi }) {
    return (
      <>
        <h1>Soc el component Blanc</h1>
        <button
          onClick={() => {
            setCanvi(false);
          }}
        >
          REGISTER
        </button>
      </>
    );
  }