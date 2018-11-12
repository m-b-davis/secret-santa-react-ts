import * as React from "react";

import { getColourFromName, hashCode } from '../../utils';

const NameIndicator = (props: { name: string }) => {
    return <span style={{backgroundColor: getColourFromName(props.name)}}>{hashCode(props.name) % 360}</span>
};

export default NameIndicator;