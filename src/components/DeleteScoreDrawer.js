import React from "react";
import { Drawer } from "antd";
import DeleteScoreForm from "./DeleteScoreForm";

class DeleteScoreDrawer extends React.Component {
  render() {
    return (
      <div>
        <Drawer
          title="Slett score"
          placement={"bottom"}
          closable={true}
          onClose={this.props.onCloseDelete}
          visible={this.props.visible}
          destroyOnClose={true}
        >
          <DeleteScoreForm
            item={this.props.item}
            onDeleted={this.props.onCloseDelete}
          />
        </Drawer>
      </div>
    );
  }
}

export default DeleteScoreDrawer;
