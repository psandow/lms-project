export default function UserForm({
  formData,
  onChange,
  onSubmit,
  submitLabel,
  showRole = false
}) {
  return (
    <form className="course-form" onSubmit={onSubmit}>
      <label>
        Username
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={onChange}
          required
        />
      </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      </label>

   {/* password field only when creating user */}
      {submitLabel === "Create User" && (
        <label>
          Password
          <input
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
        <label>
          Role
          <select
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
    </form>
  );
}
