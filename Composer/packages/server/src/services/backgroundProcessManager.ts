// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { v4 as uuid } from 'uuid';

export interface ProcessStatus {
  id: string;
  projectId: string; // reference to projectId that this process is for
  processName: string; // name used to pull this process if jobId is not known
  time: Date; // contains start time
  status: number; // contains http status code
  message: string; // contains latest message
  log: string[]; // contains all messages
  comment?: string; // contains user supplied comment about process
  config?: any; // contains provision result
}

interface ProcessList {
  [key: string]: ProcessStatus;
}

export class BackgroundProcessManager {
  static processes: ProcessList = {};

  static startProcess(
    initialStatus: number,
    projectId: string,
    processName: string,
    initialMessage?: string,
    comment?: string
  ): string {
    const id = uuid();
    this.processes[id] = {
      id: id,
      projectId: projectId,
      processName: processName,
      time: new Date(),
      status: initialStatus,
      message: initialMessage ? initialMessage : '',
      log: [initialMessage ? initialMessage : ''],
      comment: comment,
    };
    return id;
  }

  static getStatus(id: string): ProcessStatus {
    return this.processes[id];
  }

  /* Find a status by projectid/processname without knowing the id
   * for example, find status of "default" publish target, which is localpublish for which there can only be 1 running process
   * or find most recent publish to a given publish target
   */
  static getStatusByName(projectId: string, processName: string): ProcessStatus {
    const matching: any[] = [];
    for (const jobId in this.processes) {
      if (this.processes[jobId].projectId === projectId && this.processes[jobId].processName === processName) {
        matching.push(this.processes[jobId]);
      }
    }
    if (matching.length) {
      // sort reverse chrono so most recent time is first
      return matching.sort((a, b) => {
        if (a.time > b.time) {
          return -1;
        } else if (a.time < b.time) {
          return 1;
        } else {
          return 0;
        }
      })[0];
    } else {
      return {} as ProcessStatus;
    }
  }

  static updateProcess(id: string, status: number, message: string, config = undefined): string {
    this.processes[id].status = status;
    this.processes[id].message = message;
    this.processes[id].log.push(message);
    if (config) {
      this.processes[id].config = config;
    }
    return id;
  }

  static removeProcess(id: string) {
    delete this.processes[id];
  }
}
