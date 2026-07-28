export default function UserForm({
  formData,
  onChange,
  onSubmit,
  submitLabel,
  showRole = false,
  navigate
}) {
  return (
    <form className="course-form" onSubmit={onSubmit}>
      <label htmlFor="username">
        Username
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={onChange}
          required
        />
      </label>

      <label htmlFor="email">
        Email
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      </label>

   {/* password field only when creating user */}
      {submitLabel === "Create User" && (
        <label htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={onChange}
            required
          />
        </label>
      )}

    {/* role field only for admins editting user */}
      {showRole && (
        <label htmlFor="role">
          Role
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={onChange}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </label>
      )}

      <button className="course-form-button" type="submit">
        {submitLabel}
      </button>

      {submitLabel === "Create User" && 
        <button className="course-form-button" type="button" onClick={() => navigate("/")}>Go Back</button>}
      
    </form>
  );
}
