import { usePrivy, useWallets } from "@privy-io/react-auth";

export function LoginPage() {
  const { login, authenticated, user } = usePrivy();
  const { ready, wallets } = useWallets();

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={login}>Login</button>
      </div>
      userId: {user?.id}
      <p>{wallets.map((wallet) => wallet.address)}</p>
    </>
  );
}
