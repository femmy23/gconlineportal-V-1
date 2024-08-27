import styled from "styled-components";

const StyledSelect = styled.select`
  display: block;
  background-color: #eee;
  border: 0.5px solid #ccc;
  width: 100%;
  outline: none;
  height: 2.85rem;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  letter-spacing: 2px;
  &:focus {
    background-color: #dff3ff;
  }
`;

export default function Selects({ usernames, value, change }) {
  return (
    <StyledSelect
      value={value}
      onChange={(e) => change(e.target.value)}
      required
    >
      <input type="text" />
      {usernames.map((username, i) => (
        <option value={username.username} key={i}>
          {username.username}
        </option>
      ))}
    </StyledSelect>
  );
}
