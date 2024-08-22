import {
  Bandwidth,
  BendMode,
  DeleteFromDisk,
  DiskAccessReadWrite,
  FilterType,
  IndividualOutputType,
  ModulationSourceType,
  Pitch,
  PlaybackType,
  PortamentoType,
  Priority,
  Reassignment,
  Waveform,
  ZoneOutputType,
  ZonePlayback
} from "sampler-editor-librarian-dto";

export const modulationInputSourceTypes = [
  { value: ModulationSourceType.No_Source, label: "No Source" },
  { value: ModulationSourceType.Modwheel, label: "Modwheel" },
  { value: ModulationSourceType.Bend, label: "Bend" },
  { value: ModulationSourceType.Pressure, label: "Pressure" },
  { value: ModulationSourceType.External, label: "External" },
  { value: ModulationSourceType.NoteOnvelocity, label: "Note on velocity" },
  { value: ModulationSourceType.Key, label: "Key" },
  { value: ModulationSourceType.LFO1, label: "LFO 1" },
  { value: ModulationSourceType.LFO2, label: "LFO 2" },
  { value: ModulationSourceType.Env1, label: "Env 1" },
  { value: ModulationSourceType.Env2, label: "Env 2" },
  { value: ModulationSourceType.NOT_Modwheel, label: "!Modwheel" },
  { value: ModulationSourceType.NOT_Bend, label: "!Bend" },
  { value: ModulationSourceType.NOT_External, label: "!External" },
  { value: ModulationSourceType.Env3, label: "Env 3" },
]

export const waveFormTypes = [
  { value: Waveform.TRIANGLE, label: "Triangle" },
  { value: Waveform.SAWTOOTH, label: "Sawtooth" },
  { value: Waveform.SQUARE, label: "Square" },
  { value: Waveform.RANDOM, label: "Random" },
]

export const priorityTypes = [
  { value: Priority.LOW, label: "Low" },
  { value: Priority.NORMAL, label: "Normal" },
  { value: Priority.HIGH, label: "High" },
  { value: Priority.HOLD, label: "Hold" },
]

export const reassignmentTypes = [
  { value: Reassignment.OLDEST, label: "Oldest" },
  { value: Reassignment.QUIETEST, label: "Quietest" },
]

export const portamentoTypes = [
  { value: PortamentoType.RATE, label: "Rate" },
  { value: PortamentoType.TIME, label: "Time" },
]

export const bendModes = [
  { value: BendMode.NORMAL, label: "Normal" },
  { value: BendMode.HELD, label: "Held" },
]

export const individualOutputTypes = [
  { value: IndividualOutputType.OUTPUT1, label: "Output 1" },
  { value: IndividualOutputType.OUTPUT2, label: "Output 2" },
  { value: IndividualOutputType.OUTPUT3, label: "Output 3" },
  { value: IndividualOutputType.OUTPUT4, label: "Output 4" },
  { value: IndividualOutputType.OUTPUT5, label: "Output 5" },
  { value: IndividualOutputType.OUTPUT6, label: "Output 6" },
  { value: IndividualOutputType.OUTPUT7, label: "Output 7" },
  { value: IndividualOutputType.OUTPUT8, label: "Output 8" },
  { value: IndividualOutputType.FX, label: "FX" },
  { value: IndividualOutputType.REVERB, label: "Reverb" },
  { value: IndividualOutputType.REVERB_AND_FX, label: "Reverb and FX" },
  { value: IndividualOutputType.OFF, label: "Off" },
]

export const zoneOutputTypes = [
  { value: ZoneOutputType.OFF, label: "Off" },
  { value: ZoneOutputType.OUTPUT1, label: "Output 1" },
  { value: ZoneOutputType.OUTPUT2, label: "Output 2" },
  { value: ZoneOutputType.OUTPUT3, label: "Output 3" },
  { value: ZoneOutputType.OUTPUT4, label: "Output 4" },
  { value: ZoneOutputType.OUTPUT5, label: "Output 5" },
  { value: ZoneOutputType.OUTPUT6, label: "Output 6" },
  { value: ZoneOutputType.OUTPUT7, label: "Output 7" },
  { value: ZoneOutputType.OUTPUT8, label: "Output 8" },
  { value: ZoneOutputType.FX, label: "FX" },
  { value: ZoneOutputType.REVERB, label: "Reverb" },
  { value: ZoneOutputType.REVERB_AND_FX, label: "Reverb and FX" },
]

export const filterTypes = [
  { value: FilterType.LOW_PASS, label: "Low pass" },
  { value: FilterType.BAND_PASS, label: "Band pass" },
  { value: FilterType.HIGH_PASS, label: "High pass" },
  { value: FilterType.EQ, label: "Eq" },
]

export const attenuation = [
  { value: 1, label: '0dB' },
  { value: 0, label: '-6dB' },
]

export const pitch = [
  { value: Pitch.TRACK, label: "Track" },
  { value: Pitch.CONST, label: "Const" },
]

export const zonePlayBackTypes = [
  { value: ZonePlayback.AS_SAMPLE, label: "As sample" },
  { value: ZonePlayback.LOOP_IN_RELEASE, label: "Loop in release" },
  { value: ZonePlayback.LOOP_UNTIL_RELEASE, label: "Loop until release" },
  { value: ZonePlayback.NO_LOOPS, label: "No loops" },
  { value: ZonePlayback.PLAY_TO_SAMPLE_END, label: "Play to sample end" },
]

export const samplePlayBackTypes = [
  { value: PlaybackType.LOOP_IN_RELEASE, label: "Loop in release" },
  { value: PlaybackType.LOOP_UNTIL_RELEASE, label: "Loop until release" },
  { value: PlaybackType.NO_LOOPING, label: "No looping" },
  { value: PlaybackType.PLAY_TO_SAMPLE_END, label: "Play to sample end" },
]

export const bandwidths = [
  { value: Bandwidth.Ten_kHz, label: "10 Khz" },
  { value: Bandwidth.Twenty_kHz, label: "20 Khz" },
]

export const muteGroups = [
  { value: 0, label: "1" },
  { value: 1, label: "2" },
  { value: 2, label: "3" },
  { value: 3, label: "4" },
  { value: 4, label: "5" },
  { value: 5, label: "6" },
  { value: 6, label: "7" },
  { value: 7, label: "8" },
  { value: 8, label: "9" },
  { value: 9, label: "10" },
  { value: 10, label: "11" },
  { value: 11, label: "12" },
  { value: 12, label: "13" },
  { value: 13, label: "14" },
  { value: 14, label: "15" },
  { value: 15, label: "16" },
  { value: 16, label: "17" },
  { value: 17, label: "18" },
  { value: 18, label: "19" },
  { value: 19, label: "20" },
  { value: 20, label: "21" },
  { value: 21, label: "22" },
  { value: 22, label: "23" },
  { value: 23, label: "24" },
  { value: 24, label: "25" },
  { value: 25, label: "26" },
  { value: 26, label: "27" },
  { value: 27, label: "28" },
  { value: 28, label: "29" },
  { value: 29, label: "30" },
  { value: 30, label: "31" },
  { value: 31, label: "32" },
  { value: 255, label: "Off" },
]

export const programMidiChannels = [
  { value: 0, label: "1" },
  { value: 1, label: "2" },
  { value: 2, label: "3" },
  { value: 3, label: "4" },
  { value: 4, label: "5" },
  { value: 5, label: "6" },
  { value: 6, label: "7" },
  { value: 7, label: "8" },
  { value: 8, label: "9" },
  { value: 9, label: "10" },
  { value: 10, label: "11" },
  { value: 11, label: "12" },
  { value: 12, label: "13" },
  { value: 13, label: "14" },
  { value: 14, label: "15" },
  { value: 15, label: "16" },
  { value: 255, label: "Omni" },
]

export const lfoRetriggerOptions = [
  { value: 0, label: "On" },
  { value: 1, label: "Off" },
]

export const diskAccessReadWrite = [
  { value: DiskAccessReadWrite.ENTIRE_VOLUME, label: 'Entire volume'},
  { value: DiskAccessReadWrite.ALL_PROGRAMS_AND_SAMPLES, label: 'All programs and samples'},
  { value: DiskAccessReadWrite.ALL_PROGRAMS, label: 'All programs'},
  { value: DiskAccessReadWrite.ALL_SAMPLES, label: 'All samples'},
  { value: DiskAccessReadWrite.CURSOR_PROGRAMS_AND_SAMPLES, label: 'Cursor programs and samples'},
  { value: DiskAccessReadWrite.CURSOR_ITEM_ONLY, label: 'Cursor item only'},
  { value: DiskAccessReadWrite.OPERATING_SYSTEM, label: 'Operating system'},
]

export const deleteFromDisk = [
  { value: DeleteFromDisk.CURSOR_ITEM_ONLY, label: 'Cursor item only'},
  { value: DeleteFromDisk.ALL_PROGRAMS_ONLY, label: 'All programs'},
  { value: DeleteFromDisk.ALL_SAMPLES, label: 'All samples'},
  { value: DeleteFromDisk.ENTIRE_VOLUME, label: 'Entire volume'},
  { value: DeleteFromDisk.OPERATING_SYSTEM, label: 'Operating system'},
]
