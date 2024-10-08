import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ChorusEffect,
  DelayEffect,
  EchoEffect,
  KeyGroup as InMemoryKeygroup,
  Program as InMemoryProgram,
  Sample as InMemorySample,
  PitchShiftEffect,
  Reverb,
} from 'sampler-editor-librarian-dto';
import { HardDrivePartitionLetterPipe } from '../pipes/hard-drive-partition-letter.pipe';

interface HardDiskEntryDetails {
  name: string;
  file_type: number;
  model: number;
  type: string;
}

export interface HardDiskEntryDetailsType {
  index: number;
  name: string;
  type: string;
}

interface VolumeListEntryDetails {
  entry_number: number;
  entry_name: string;
  active: boolean;
  type: number;
}

export interface VolumeListEntryDetailsType {
  index: number;
  name: string;
  active: boolean;
  type: string;
}

interface S1000MiscellaneousData {
  selected_program_number: number;
  midi_play_commands_omni_override: number;
  basic_channel_omni: number;
  basic_midi_channel: number;
  midi_program_select_enable: number;
  midi_exlusive_channel: number;
}

export interface S1000MiscellaneousDataType {
  selectedProgramNumber: number;
  midiPlayCommandsOmniOverride: boolean;
  basicChannelOmni: boolean;
  basicMidiChannel: number;
  midiProgramSelectEnable: boolean;
  midiExlusiveChannel: number;
}

export interface StatusReport {
  software_version_minor: number;
  software_version_major: number;
  max_blocks: number;
  free_blocks: number;
  max_sample_words: number;
  free_words: number;
  exclusive_channel: number;
}

export interface StatusReportDetail {
  name: string;
  value: number;
}

export interface FileDetails {
  name: string;
  file_type: string;
}

export interface ProgramDetails {
  midi_program_number: number;
  name: string;
}

export interface NameOnly {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SamplerService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:4000/api/midi/sampler/';

  samplerStatusReport(): Observable<StatusReportDetail[]> {
    return this.httpClient.get<StatusReport>(this.baseUrl + 'sampler-status-report')
            .pipe(map((data) => {
              const samplerStatusData = new Array<StatusReportDetail>();
              const exclusiveChannel: StatusReportDetail = {
                name: 'exclusive channel',
                value: data.exclusive_channel,
              };
              samplerStatusData.push(exclusiveChannel);
              const freeBlocks: StatusReportDetail = {
                name: 'free blocks',
                value: data.free_blocks,
              };
              samplerStatusData.push(freeBlocks);
              const freeWords: StatusReportDetail = {
                name: 'free words',
                value: data.free_words,
              };
              samplerStatusData.push(freeWords);
              const maxBlocks: StatusReportDetail = {
                name: 'max blocks',
                value: data.max_blocks,
              };
              samplerStatusData.push(maxBlocks);
              const maxSampleWords: StatusReportDetail = {
                name: 'max sample words',
                value: data.max_sample_words,
              };
              samplerStatusData.push(maxSampleWords);
              const softwareVersionMajor: StatusReportDetail = {
                name: 'software version major',
                value: data.software_version_major,
              };
              samplerStatusData.push(softwareVersionMajor);
              const softwareVersionMinor: StatusReportDetail = {
                name: 'software version minor',
                value: data.software_version_minor,
              };
              samplerStatusData.push(softwareVersionMinor);

              return samplerStatusData;
            }));
  }

  samplerRequestResidentProgramNames(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      this.baseUrl + 'request-resident-program-names',
    );
  }

  samplerRequestResidentProgramNamesWithMidiProgramNumbers(): Observable<
    ProgramDetails[]
  > {
    return this.httpClient.get<ProgramDetails[]>(
      this.baseUrl + 'request-resident-program-names-with-numbers',
    );
  }

  samplerRequestResidentSampleNames(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      this.baseUrl + 'request-resident-sample-names',
    );
  }

  samplerRequestHardDiskDirectory(): Observable<HardDiskEntryDetailsType[]> {
    return this.httpClient.get<HardDiskEntryDetails[]>(
      this.baseUrl + 'hard-disk-dir',
    ).pipe(map((data) => {
      return data.map((entry, index): HardDiskEntryDetailsType => {
        return {
          index: index,
          type: entry.type,
          name: entry.name,
        }
      });
    }));
  }
  samplerRequestHardDiskDirectoryAll(): Observable<HardDiskEntryDetails[]> {
    return this.httpClient.get<HardDiskEntryDetails[]>(
      this.baseUrl + 'hard-disk-dir-entries-all',
    );
  }

  samplerRequestVolumeList(): Observable<VolumeListEntryDetailsType[]> {
    return this.httpClient.get<VolumeListEntryDetails[]>(
      this.baseUrl + 'volume-list',
    ).pipe(map((data) => {
      const entries2: VolumeListEntryDetailsType[] = [];

      data.forEach((volumeEntry) => {
        const entry: VolumeListEntryDetailsType = {
          index: volumeEntry.entry_number,
          name: volumeEntry.entry_name,
          active: true,
          type: volumeEntry.type === 3 ? 'S3000' : 'S1000',
        };
        entries2.push(entry);
      });
      return entries2;
    }));
  }

  samplerRequestProgramHeader(
    programNumberInMemory: number,
  ): Observable<InMemoryProgram> {
    return this.httpClient.get<InMemoryProgram>(
      this.baseUrl + 'program/' + programNumberInMemory,
    );
  }

  samplerChangeNameInProgramHeader(
    programNumberInMemory: number,
    programHeaderIndex: number,
    newProgramName: string,
  ): void {
    this.httpClient
      .put(
        this.baseUrl +
          'program/' +
          programNumberInMemory +
          '/index/' +
          programHeaderIndex +
          '/name/' +
          newProgramName,
        null,
      )
      .subscribe((data) => console.log('Program name changed:', data));
  }

  samplerChangeValueInProgramHeader(
    programNumberInMemory: number,
    programHeaderIndex: number,
    value: number | boolean | null,
  ): void {
    this.httpClient
      .put(
        this.baseUrl +
          'program/' +
          programNumberInMemory +
          '/index/' +
          programHeaderIndex +
          '/value/' +
          (typeof value !== 'boolean' ? value : value ? 1 : 0),
        null,
      )
      .subscribe((data) => console.log('Program data changed:', data));
  }

  samplerRequestKeygroupHeader(
    programNumberInMemory: number,
    keygroupNumberInMemory: number,
  ): Observable<InMemoryKeygroup> {
    return this.httpClient.get<InMemoryKeygroup>(
      this.baseUrl +
        'program/' +
        programNumberInMemory +
        '/keygroup/' +
        keygroupNumberInMemory,
    );
  }

  samplerChangeValueInKeygroupHeader(
    programNumberInMemory: number,
    keygroupNumberInMemory: number,
    keygroupHeaderIndex: number,
    value: number | boolean | null,
  ): void {
    this.httpClient
      .put(
        this.baseUrl +
          'keygroup/program/' +
          programNumberInMemory +
          '/keygroup/' +
          keygroupNumberInMemory +
          '/index/' +
          keygroupHeaderIndex +
          '/value/' +
          (typeof value !== 'boolean' ? value : value ? 1 : 0),
        null,
      )
      .subscribe((data) => console.log('Keygroup data changed:', data));
  }

  samplerChangeZoneSampleNameInKeyGroupHeader(
    programNumberInMemory: number,
    keygroupNumberInMemory: number,
    keygroupHeaderIndex: number,
    name: string,
  ) {
    this.httpClient
      .put(
        this.baseUrl +
          'keygroup/program/' +
          programNumberInMemory +
          '/keygroup/' +
          keygroupNumberInMemory +
          '/index/' +
          keygroupHeaderIndex +
          '/name/' +
          name,
        null,
      )
      .subscribe((data) => console.log('Zone sample name changed:', data));
  }

  samplerRequestSampleHeader(
    sampleNumberInMemory: number,
  ): Observable<InMemorySample> {
    return this.httpClient.get<InMemorySample>(
      this.baseUrl + 'sample/' + sampleNumberInMemory,
    );
  }

  samplerChangeValueInSampleHeader(
    sampleNumberInMemory: number,
    sampleHeaderIndex: number,
    value: number | boolean | null,
  ): void {
    this.httpClient
      .put(
        this.baseUrl +
          'sample/' +
          sampleNumberInMemory +
          '/index/' +
          sampleHeaderIndex +
          '/value/' +
          (typeof value !== 'boolean' ? value : value ? 1 : 0),
        null,
      )
      .subscribe((data) => console.log('Sample data changed: ', data));
  }

  samplerChangeSampleNameInSampleHeader(
    sampleNumberInMemory: number,
    sampleHeaderIndex: number,
    name: string,
  ) {
    this.httpClient
      .put(
        this.baseUrl +
          'sample/' +
          sampleNumberInMemory +
          '/index/' +
          sampleHeaderIndex +
          '/name/' +
          name,
        null,
      )
      .subscribe((data) => console.log('Sample name changed: ', data));
  }

  samplerRequestS1000MiscellaneousData(): Observable<S1000MiscellaneousData> {
    return this.httpClient.get<S1000MiscellaneousData>(
      this.baseUrl + 's1000-misc-data',
    );
  }

  samplerChangeS1000MiscellaneousData(data: S1000MiscellaneousDataType) {
    return this.httpClient
      .put(this.baseUrl + 's1000-misc-data', data)
      .subscribe((data) => console.log('S1000 miscellaneous data changed: ', data));
  }

  samplerNewProgram(programNumberInMemory: number): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.baseUrl + 'program/' + programNumberInMemory,
      null,
    );
  }

  samplerDeleteProgram(programNumberInMemory: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      this.baseUrl + 'program/' + programNumberInMemory,
    );
  }

  samplerNewKeygroup(
    programNumberInMemory: number,
    keygroupNumberInMemory: number,
  ): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.baseUrl +
        'program/' +
        programNumberInMemory +
        '/keygroup/' +
        keygroupNumberInMemory,
      null,
    );
  }

  samplerDeleteKeygroup(
    programNumberInMemory: number,
    keygroupNumberInMemory: number,
  ): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      this.baseUrl +
        'program/' +
        programNumberInMemory +
        '/keygroup/' +
        keygroupNumberInMemory,
    );
  }

  samplerDeleteSample(sampleNumberInMemory: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      this.baseUrl + 'sample/' + sampleNumberInMemory,
    );
  }

  samplerSelectFloppy(): Observable<boolean> {
    return this.httpClient.patch<boolean>(this.baseUrl + 'floppy', null);
  }

  samplerSelectHardDrive(): Observable<boolean> {
    return this.httpClient.patch<boolean>(this.baseUrl + 'harddrive', null);
  }

  samplerHardDriveNumberOfPartitions(): Observable<NameOnly[]> {
    return this.httpClient.get<number>(this.baseUrl + 'harddrive/partitions')
              .pipe(map((numberOfPartitions: number) => {
                const partitionLetterPipe = new HardDrivePartitionLetterPipe();
                return Array.from(
                  { length: numberOfPartitions },
                  (e, index) => { return { name: partitionLetterPipe.transform(index) } },
                );
              })
            );
  }

  samplerSelectHardDrivePartition(
    partitionNumber: number,
  ): Observable<boolean> {
    return this.httpClient.patch<boolean>(
      this.baseUrl + 'harddrive/partition/' + partitionNumber,
      null,
    );
  }

  samplerHardDrivePartitionNumberOfVolumes(): Observable<number> {
    return this.httpClient.get<number>(
      this.baseUrl + 'harddrive/partition/volumes',
    );
  }

  samplerSelectHardDriveVolume(volumeNumber: number): Observable<boolean> {
    return this.httpClient.patch<boolean>(
      this.baseUrl + 'harddrive/partition/volume/' + volumeNumber,
      null,
    );
  }

  samplerClearMemoryAndLoadFromSelectedVolume(
    loadType: number,
  ): Observable<boolean> {
    return this.httpClient.patch<boolean>(
      this.baseUrl + 'clear_memory_and_load_from_selected_volume/' + loadType,
      null,
    );
  }

  samplerLoadFromSelectedVolume(loadType: number): Observable<boolean> {
    return this.httpClient.patch<boolean>(
      this.baseUrl + 'load_from_selected_volume/' + loadType,
      null,
    );
  }

  samplerClearVolumeAndSaveMemoryToSelectedVolume(
    saveType: number,
  ): Observable<boolean> {
    return this.httpClient.patch<boolean>(
      this.baseUrl +
        'clear_volume_and_save_memory_to_selected_volume/' +
        saveType,
      null,
    );
  }

  samplerSaveMemoryToSelectedVolume(saveType: number): Observable<boolean> {
    return this.httpClient.patch<boolean>(
      this.baseUrl + 'save_memory_to_selected_volume/' + saveType,
      null,
    );
  }

  samplerSaveMemoryToNewVolume(saveType: number): Observable<boolean> {
    return this.httpClient.patch<boolean>(
      this.baseUrl + 'save_memory_to_new_volume/' + saveType,
      null,
    );
  }

  samplerHardDriveSelectedPartition(): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl + 'harddrive/partition');
  }

  samplerHardDrivePartitionSelectedVolume(): Observable<number> {
    return this.httpClient.get<number>(
      this.baseUrl + 'harddrive/partition/volume',
    );
  }

  samplerEffectHeaderFilename(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + 'effect-header/filename');
  }

  samplerEffectHeaderFilenameUpdate(filename: string): Observable<boolean> {
    return this.httpClient.patch<boolean>(
      this.baseUrl + 'effect-header/filename/' + filename,
      null,
    );
  }

  samplerEffects(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.baseUrl + 'effects');
  }

  samplerEffect(
    effectNumber: number,
  ): Observable<DelayEffect | ChorusEffect | PitchShiftEffect | EchoEffect> {
    return this.httpClient.get<
      DelayEffect | ChorusEffect | PitchShiftEffect | EchoEffect
    >(this.baseUrl + 'effect/' + effectNumber);
  }

  samplerEffectUpdatePart(
    effectNumber: number,
    effectType: number,
    index: number,
    value: number,
    subscription = (success: boolean) => console.log('Effect updated', success)
  ) {
    return this.httpClient
      .patch<boolean>(
        this.baseUrl +
          'effect/' +
          effectNumber +
          '/effect_type/' +
          effectType +
          '/index/' +
          index +
          '/value/' +
          value,
        null,
      )
      .subscribe(subscription);
  }

  samplerEffectUpdateName(
    effectNumber: number,
    name: string,
    subscription = (success: boolean) => console.log('Effect name updated', success)) {
    return this.httpClient
      .patch<boolean>(
        this.baseUrl + 'effect/' + effectNumber + '/name/' + name,
        null,
      )
      .subscribe(subscription);
  }

  samplerReverbs(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.baseUrl + 'reverbs');
  }

  samplerReverb(reverbNumber: number): Observable<Reverb> {
    return this.httpClient.get<Reverb>(this.baseUrl + 'reverb/' + reverbNumber);
  }

  samplerReverbUpdatePart(reverbNumber: number, index: number, value: number) {
    return this.httpClient
      .patch<boolean>(
        this.baseUrl +
          'reverb/' +
          reverbNumber +
          '/index/' +
          index +
          '/value/' +
          value,
        null,
      )
      .subscribe((success) => console.log('Reverb updated', success));
  }

  samplerReverbUpdateName(reverbNumber: number, name: string,
    subscription = (success: boolean) => console.log('Reverb name updated', success)) {
    return this.httpClient
      .patch<boolean>(
        this.baseUrl + 'reverb/' + reverbNumber + '/name/' + name,
        null,
      )
      .subscribe(subscription);
  }

  samplerProgramReverbAssignments(): Observable<number[]> {
    return this.httpClient.get<number[]>(
      this.baseUrl + 'program/reverb/assignments',
    );
  }

  samplerProgramEffectAssignments(): Observable<number[]> {
    return this.httpClient.get<number[]>(
      this.baseUrl + 'program/effect/assignments',
    );
  }

  samplerProgramReverbAssignment(programNumber: number, reverbNumber: number) {
    return this.httpClient
      .patch<number[]>(
        this.baseUrl +
          'assignment/program/' +
          programNumber +
          '/reverb/' +
          reverbNumber,
        null,
      )
      .subscribe((success) =>
        console.log('Program reverb assignment updated', success),
      );
  }

  samplerProgramEffectAssignment(programNumber: number, effectNumber: number) {
    this.httpClient
      .patch<number[]>(
        this.baseUrl +
          'assignment/program/' +
          programNumber +
          '/effect/' +
          effectNumber,
        null,
      )
      .subscribe((success) =>
        console.log('Program effect assignment updated', success),
      );
  }

  samplerGetMiscellaneousBytes(
    dataIndex: number,
    dataBank: number,
  ): Observable<number> {
    return this.httpClient.get<number>(
      this.baseUrl +
        'miscellaneous-bytes/' +
        dataIndex +
        '/data_bank_number/' +
        dataBank,
    );
  }

  samplerUpdateMiscellaneousBytes(
    dataIndex: number,
    dataBank: number,
    changed_value: number,
  ): Observable<boolean> {
    return this.httpClient.put<boolean>(
      this.baseUrl +
        'miscellaneous-bytes/' +
        dataIndex +
        '/data_bank_number/' +
        dataBank +
        '/value/' +
        changed_value,
      null,
    );
  }

  samplerAllFilesInMemory(): Observable<FileDetails[]> {
    return this.httpClient.get<FileDetails[]>(
      this.baseUrl + 'all-files-in-memory',
    );
  }
}
