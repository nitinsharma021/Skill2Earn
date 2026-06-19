export default function CreateGig() {
  return (
    <div className="create-gig">
      <h1>Create a Gig</h1>
      <form>
        <input type="text" placeholder="Gig Title" />
        <textarea placeholder="Description"></textarea>
        <input type="number" placeholder="Price" />
        <select>
          <option value="">Select Category</option>
        </select>
        <button type="submit">Create Gig</button>
      </form>
    </div>
  );
}
