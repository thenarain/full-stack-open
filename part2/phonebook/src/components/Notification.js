const Notification = (props) => {
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    bordeRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (props.message === null) {
    return null;
  }
  return <div style={messageStyle}>{props.message}</div>;
};

export default Notification;
