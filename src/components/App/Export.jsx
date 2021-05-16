/* @jsx h */
import { h } from 'preact';
import Collapsible from '../Collapsible';
import './Export.css';
import DataExport from './Export/DataExport';
import ImageExport from './Export/ImageExport';

export function Export() {
	return (
		<div className="export">
			<Collapsible header="Data" description="Font in .bitsyfont format">
				<DataExport />
			</Collapsible>
			<Collapsible header="Image" description="Font as .bitsyfont.png for editing in external program">
				<ImageExport />
			</Collapsible>
		</div>
	);
}

export default Export;
