function UploadImage(props) {
  // eslint-disable-next-line react/prop-types
  const { formData, setFormData } = props;
  const handlePhotoChange = (event) => {
    setFormData({ ...formData, photo: event.target.files[0] });
  };
  return (
    <div className="container">
      <h5>Joindre une photo du sinistre</h5>

      <div>
        <label htmlFor="photo">Photo :</label>
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={handlePhotoChange}
        />
      </div>
    </div>
  );
}

export default UploadImage;
