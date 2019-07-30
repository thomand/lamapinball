import React from "react";
import { Drawer } from "antd";
import UpdateScoreForm from "./UpdateScoreForm";

class UpdateScoreDrawer extends React.Component {
  render() {
    return (
      <div>
        <Drawer
          title="Oppdater score"
          placement={"bottom"}
          closable={true}
          onClose={this.props.onCloseUpdate}
          visible={this.props.visible}
          height={"50%"}
          destroyOnClose={true}
        >
          <UpdateScoreForm
            item={this.props.item}
            onUpdated={this.props.onCloseUpdate}
          />
        </Drawer>
      </div>
    );
  }
}

export default UpdateScoreDrawer;
