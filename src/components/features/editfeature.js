{
  editFlag && (
    <Modal
      title="Edit Feature"
      visible={editFlag}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => handleOk(item.id, newTitle, newDescription)}
        >
          Edit Feature
        </Button>,
      ]}
    >
      {alert && <Alert type={alert.type} message={alert.message} />}
      <Input
        className="project-input"
        type="text"
        value={item.title}
        onChange={(e) => setNewTitle(e.target.value)}
        // placeholder={item.title}
      />
      <Input
        className="project-input"
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder={item.description}
      />
    </Modal>
  );
}
