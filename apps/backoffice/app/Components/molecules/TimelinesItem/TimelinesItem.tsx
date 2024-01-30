import { Row, Space, TimelineItemProps, Typography } from 'antd';
import TimelineItem from 'antd/es/timeline/TimelineItem';
import React from 'react';

interface ITimelineItemProps extends TimelineItemProps {
    title: string;
    description: string;
    time: string;
}

const secondaryStyle = {
    fontSize: '12px',
    opacity: '45%',
};

const TimelinesItem = (props: ITimelineItemProps) => {
    const { title, description, time } = props;

    return (
        <TimelineItem {...props}>
            <Row justify="space-between">
                <Space direction="vertical" style={{ width: '377px' }}>
                    <Typography.Text
                        style={{
                            fontSize: '14px',
                            opacity: '85%',
                            fontWeight: 600,
                        }}
                    >
                        {title}
                    </Typography.Text>
                    <Typography.Text style={secondaryStyle}>
                        {description}
                    </Typography.Text>
                </Space>
                <Typography.Text style={secondaryStyle}>{time}</Typography.Text>
            </Row>
        </TimelineItem>
    );
};

export default TimelinesItem;
