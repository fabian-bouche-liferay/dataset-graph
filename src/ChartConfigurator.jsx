import React, { useEffect, useState } from "react";

import {SidePanel} from '@clayui/core';
import Button from '@clayui/button';
import Icon from '@clayui/icon';
import XAxisSelector from "./XAxisSelector";
import YAxisSelector from "./YAxisSelector";

const ChartConfigurator = ({
  xFields, setXFields,
  xGroupings, setXGroupings,
  xOptions, fields,
  yMethod, setYMethod,
  yField, setYField,
  yNumericFields
}) => {
  const [open, setOpen] = useState(false);
  const ref = React.useRef();

  return (
    <>
      <Button
        className="float-right"
        aria-controls="sidepanel-example"
        aria-pressed={open}
        onClick={() => setOpen(!open)}
      >
        <Icon symbol="cog" />
      </Button>

      <SidePanel
        containerRef={ref}
        id="sidepanel-example"
        open={open}
        onOpenChange={setOpen}
        style={{ width: 480 }}
      >
        <SidePanel.Header>
          <SidePanel.Title>Graph options</SidePanel.Title>
        </SidePanel.Header>
        <SidePanel.Body>
          <XAxisSelector
            xFields={xFields}
            setXFields={setXFields}
            xGroupings={xGroupings}
            setXGroupings={setXGroupings}
            xOptions={xOptions}
            fields={fields}
          />
          <YAxisSelector
            yMethod={yMethod}
            setYMethod={setYMethod}
            yField={yField}
            setYField={setYField}
            yNumericFields={yNumericFields}
          />
        </SidePanel.Body>
      </SidePanel>
    </>
  );
};

export default ChartConfigurator;