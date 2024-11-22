import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';

import { timelines } from '../tools/store';
import { TimelineItem } from '../tools/types';

export default function TimelinesComponent() {
    const customizedContent = (item: TimelineItem) => {
        return (
            <Card title={item.title} subTitle={`${item.start_date} - ${item.final_date}`} className="text-left my-4 shadow-2">
                {item.image && <img src={item.image} onError={(e) => (e.currentTarget.src = '/images/layout/noaa--urO88VoCRE-unsplash.jpg')} alt={item.title} width={200} className="shadow-2 mb-3" />}
                <p>{item.text}</p>
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
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <div className="grid justify-content-center">
                <div className="col-12 text-center my-4">
                    <h2 className="text-900 font-normal mb-2">Project Progress and Achivements</h2>
                    <span className="text-600 text-2xl">The project aims to assess the skilfulness and sustainability of developing a cloud-based machine learning post processing technique for improved high-impact weather forecasts</span>
                </div>
                <div className="card timeline-demo">
                    <Timeline value={timelines} content={customizedContent} opposite={(item) => `${item.start_date} - ${item.final_date}`} marker={customizedMarker} align="right" className="customized-timeline" />
                </div>
            </div>
        </div>
    );
}
