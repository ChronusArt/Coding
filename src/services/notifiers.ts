import type { Notifier } from '../types';

export class ConsoleNotifier implements Notifier {
  readonly id = 'console';
  readonly label = 'Browser console';

  notify(message: string): void {
    console.info('[Task Board]', message);
  }
}

export class ToastNotifier implements Notifier {
  readonly id = 'toast';
  readonly label = 'Toast message';

  constructor(private readonly push: (message: string) => void) {}

  notify(message: string): void {
    this.push(message);
  }
}

export class InAppLogNotifier implements Notifier {
  readonly id = 'log';
  readonly label = 'Activity log';

  constructor(private readonly push: (message: string) => void) {}

  notify(message: string): void {
    this.push(`${new Date().toLocaleTimeString()}  ${message}`);
  }
}

/** Fans a message out to every registered channel. */
export class NotificationService {
  private channels: readonly Notifier[] = [];

  register(channel: Notifier): void {
    if (this.channels.some((item) => item.id === channel.id)) return;
    this.channels = [...this.channels, channel];
  }

  unregister(id: string): void {
    this.channels = this.channels.filter((item) => item.id !== id);
  }

  list(): readonly Notifier[] {
    return this.channels;
  }

  notify(message: string): void {
    this.channels.forEach((channel) => channel.notify(message));
  }
}
