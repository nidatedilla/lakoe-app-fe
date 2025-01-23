import { Box } from '@chakra-ui/react';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from './ui/timeline';
import { LuCheck, LuPackage, LuShip } from 'react-icons/lu';

export default function HistoryOrder() {
  return (
    <Box
      borderRadius={'2xl'}
      borderWidth={'1px'}
      borderColor={'gray.200'}
      px={3}
      pt={3}
    >
      <TimelineRoot w={'350px'}>
        <TimelineItem>
          <TimelineConnector bg={'blue.500'}>
            <LuPackage />
          </TimelineConnector>
          <TimelineContent>
            <TimelineTitle textStyle="sm">Pesanan Diproses</TimelineTitle>
            <TimelineDescription>
              Rab, 22 Jan 2025 - 21:00 WIB
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineConnector bg={'gray.500'}>
            <LuCheck />
          </TimelineConnector>
          <TimelineContent>
            <TimelineTitle textStyle="sm">
              Pembayaran Terverifikasi
            </TimelineTitle>
            <TimelineDescription>
              Rab, 22 Jan 2025 - 20:05 WIB
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineConnector bg={'gray.500'}>
            <LuShip />
          </TimelineConnector>
          <TimelineContent>
            <TimelineTitle>Pesanan Dibuat</TimelineTitle>
            <TimelineDescription>
              Rab, 22 Jan 2025 - 20:00 WIB
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </TimelineRoot>
    </Box>
  );
}
