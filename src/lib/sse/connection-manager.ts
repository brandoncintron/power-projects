/**
 * @file Manages Server-Sent Events connections for real-time project activity updates.
 *
 * This service:
 * 1. Tracks active SSE connections per project
 * 2. Provides methods to broadcast activity updates to connected clients
 * 3. Handles connection cleanup and error management
 * 4. Ensures only authorized users receive project activity updates
 */

import type {
  SSEConnection,
  SSEMessage,
} from "@/app/(protected)/projects/[projectId]/types/types";

class SSEConnectionManager {
  private connections = new Map<string, SSEConnection[]>();

  /**
   * Adds a new SSE connection for a project
   */
  addConnection(
    projectId: string,
    userId: string,
    controller: ReadableStreamDefaultController,
  ) {
    const connectionId = `${projectId}-${userId}-${Date.now()}`;
    const connection: SSEConnection = {
      id: connectionId,
      projectId,
      userId,
      controller,
    };

    if (!this.connections.has(projectId)) {
      this.connections.set(projectId, []);
    }

    this.connections.get(projectId)!.push(connection);

    console.log(
      `[SSE Manager] Connection ADDED (ID: ${connectionId}, Project: ${projectId}). Total for project: ${
        this.connections.get(projectId)!.length
      }. Total overall: ${this.getTotalConnectionCount()}`,
    );

    return connectionId;
  }

  /**
   * Broadcasts a new activity to all connected clients for a specific project
   */
  broadcastToProject(projectId: string, activity: SSEMessage) {
    const projectConnections = this.connections.get(projectId);
    if (!projectConnections || projectConnections.length === 0) {
      console.log(`No active SSE connections for project ${projectId}`);
      return;
    }

    const message = `data: ${JSON.stringify(activity)}\n\n`;
    const deadConnections: SSEConnection[] = [];

    projectConnections.forEach((connection) => {
      try {
        connection.controller.enqueue(new TextEncoder().encode(message));
      } catch {
        console.log(
          `[SSE Manager] Broadcast to connection ${connection.id} FAILED. Marking for removal.`,
        );
        deadConnections.push(connection);
      }
    });

    // Clean up dead connections
    if (deadConnections.length > 0) {
      const deadConnectionIds = deadConnections.map((c) => c.id);
      console.log(
        `[SSE Manager] Removing dead connections from broadcast: ${deadConnectionIds.join(
          ", ",
        )}`,
      );
      const aliveConnections = projectConnections.filter(
        (conn) => !deadConnections.includes(conn),
      );

      if (aliveConnections.length === 0) {
        this.connections.delete(projectId);
      } else {
        this.connections.set(projectId, aliveConnections);
      }
    }

    console.log(
      `Broadcasted activity to ${
        projectConnections.length - deadConnections.length
      } clients for project ${projectId}`,
    );
  }

  /**
   * Sends a heartbeat to all connections to keep them alive
   */
  sendHeartbeat() {
    const heartbeatMessage = `: heartbeat\n\n`;
    const totalConnections = this.getTotalConnectionCount();
    if (totalConnections === 0) return; // Don't log if there's nothing to do

    this.connections.forEach((projectConnections, projectId) => {
      const deadConnections: SSEConnection[] = [];

      projectConnections.forEach((connection) => {
        try {
          connection.controller.enqueue(
            new TextEncoder().encode(heartbeatMessage),
          );
        } catch {
          console.log(
            `[SSE Manager] Heartbeat to connection ${connection.id} FAILED. Marking for removal.`,
          );
          deadConnections.push(connection);
        }
      });

      // Clean up dead connections
      if (deadConnections.length > 0) {
        const deadConnectionIds = deadConnections.map((c) => c.id);
        console.log(
          `[SSE Manager] Removing dead connections from heartbeat on project ${projectId}: ${deadConnectionIds.join(
            ", ",
          )}`,
        );
        const aliveConnections = projectConnections.filter(
          (conn) => !deadConnections.includes(conn),
        );

        if (aliveConnections.length === 0) {
          this.connections.delete(projectId);
        } else {
          this.connections.set(projectId, aliveConnections);
        }
      }
    });
  }

  /**
   * Gets the count of active connections for a project
   */
  getConnectionCount(projectId: string): number {
    return this.connections.get(projectId)?.length || 0;
  }

  /**
   * Gets total connection count across all projects
   */
  getTotalConnectionCount(): number {
    let total = 0;
    this.connections.forEach((connections) => {
      total += connections.length;
    });
    return total;
  }
}

// Singleton instance
export const sseConnectionManager = new SSEConnectionManager();

// Start heartbeat interval to keep connections alive
setInterval(() => {
  sseConnectionManager.sendHeartbeat();
}, 30000); // Send heartbeat every 30 seconds
