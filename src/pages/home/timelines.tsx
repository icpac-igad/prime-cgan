import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';

import { timelines } from '@/pages/tools/store';
import { TimelineItem } from '@/pages/tools/types';

export default function TimelinesComponent() {
    const customizedContent = (item: TimelineItem) => {
        return (
            <Card title={item.title} subTitle={`${item.start_date} - ${item.final_date}`} className="text-left shadow-2">
                <p className="mt-0">{item.text}</p>
                {item.image && <img src={item.image} onError={(e) => (e.currentTarget.src = '/images/timelines/sewaa-project-implementation-phases.png')} alt={item.title} width={725} className="surface-0 shadow-0 mb-1" />}
            </Card>
        );
    };

    const customizedMarker = (item: TimelineItem) => {
        return (
            <span className="custom-marker shadow-1" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>
        );
    };

    return (
        <div className="grid justify-content-center">
            <div className="col-12 text-center my-4">
                <h2 className="text-900 font-normal mb-2">Project Timelines</h2>
                <span className="text-600 text-2xl">Detailed project implimentation plan and timelines</span>
            </div>
            <div className="card timeline-demo">
                <Timeline value={timelines} content={customizedContent} marker={customizedMarker} align="alternate" className="customized-timeline" />
            </div>
        </div>
    );
}
