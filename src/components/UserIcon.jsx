import "./userIcon.css";
export default function UserIcon({ gender, name, isSmall }) {
  return (
    <div
      className={`user-icon ${isSmall ? "user-icon-small" : ""}  ${
        gender.toLowerCase() == "male" ? "user-icon-male" : "user-icon-female"
      } } item-center`}
    >
      {name.length > 0 ? name[0].toUpperCase() : ""}
    </div>
  );
}
