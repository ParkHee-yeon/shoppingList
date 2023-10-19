const ConfirmModal = ({ data }) => {
  const { title, description, button } = data;
  console.log("confirmModal data !!", data);
  return (
    <div className="alertBox">
      <h2>{title}</h2>
      <h3>{description}</h3>
      <div>
        {button.map((item, idx) => {
          return (
            <>
              <button key={idx} onClick={item.callback}>
                {item.name}
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default ConfirmModal;
