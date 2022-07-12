export default function Profile({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  return (
    <div>
      <b>{username}</b>
      <span>({name})</span>
    </div>
  );
}
