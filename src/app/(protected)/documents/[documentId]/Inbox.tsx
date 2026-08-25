"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClientSideSuspense } from "@liveblocks/react";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import {
  useDeleteAllInboxNotifications,
  useInboxNotifications,
  useMarkAllInboxNotificationsAsRead,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import {
  BellIcon,
  CheckCheckIcon,
  Loader2Icon,
  Trash2Icon,
} from "lucide-react";

const Inbox = () => {
  return (
    <ClientSideSuspense fallback={<InboxTriggerSkeleton />}>
      <InboxMenu />
    </ClientSideSuspense>
  );
};

export default Inbox;

const InboxTriggerSkeleton = () => (
  <Button
    variant="ghost"
    size="icon"
    className="relative"
    aria-label="Notifications"
    disabled
  >
    <BellIcon className="size-5 animate-pulse text-muted-foreground" />
  </Button>
);

const InboxMenu = () => {
  const {
    inboxNotifications,
    fetchMore,
    isFetchingMore,
    hasFetchedAll,
    fetchMoreError,
  } = useInboxNotifications();
  const { count: unreadCount } = useUnreadInboxNotificationsCount();
  const markAllInboxNotificationsAsRead = useMarkAllInboxNotificationsAsRead();
  const deleteAllInboxNotifications = useDeleteAllInboxNotifications();

  const [confirmingClear, setConfirmingClear] = useState(false);

  const notificationCount = inboxNotifications.length;
  const hasUnread = unreadCount > 0;

  const handleClearAll = () => {
    if (!confirmingClear) {
      setConfirmingClear(true);
      return;
    }

    deleteAllInboxNotifications();
    setConfirmingClear(false);
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) setConfirmingClear(false);
      }}
    >
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={
              hasUnread
                ? `Notifications, ${unreadCount} unread`
                : "Notifications"
            }
          >
            <BellIcon className="size-5" />

            {hasUnread && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-medium text-white ring-2 ring-background">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-80 p-0 sm:w-96">
        <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
          <span className="text-sm font-semibold">Notifications</span>

          <div className="flex items-center gap-3">
            {hasUnread && (
              <button
                type="button"
                onClick={() => markAllInboxNotificationsAsRead()}
                className="flex items-center gap-1 text-xs font-medium text-sky-600 transition-colors hover:text-sky-700 hover:underline"
              >
                <CheckCheckIcon className="size-3.5" />
                Mark all read
              </button>
            )}

            {notificationCount > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                onBlur={() => setConfirmingClear(false)}
                className="flex items-center gap-1 text-xs font-medium text-destructive/80 transition-colors hover:text-destructive hover:underline"
              >
                <Trash2Icon className="size-3.5" />
                {confirmingClear ? "Confirm?" : "Clear all"}
              </button>
            )}
          </div>
        </div>

        {notificationCount > 0 ? (
          <div className="max-h-96 overflow-y-auto">
            <InboxNotificationList>
              {inboxNotifications.map((inboxNotification) => (
                <InboxNotification
                  key={inboxNotification.id}
                  inboxNotification={inboxNotification}
                />
              ))}
            </InboxNotificationList>

            <div className="border-t p-2">
              {!hasFetchedAll ? (
                <button
                  type="button"
                  onClick={fetchMore}
                  disabled={isFetchingMore}
                  className="flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium text-sky-600 transition-colors hover:bg-sky-50 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isFetchingMore ? (
                    <>
                      <Loader2Icon className="size-3.5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Show more"
                  )}
                </button>
              ) : (
                <p className="py-1 text-center text-xs text-muted-foreground">
                  You&apos;re all caught up
                </p>
              )}

              {fetchMoreError && (
                <p className="mt-1 text-center text-xs text-destructive">
                  Failed to load more. Try again.
                </p>
              )}
            </div>
          </div>
        ) : (
          <DropdownMenuItem className="cursor-default justify-center p-6 focus:bg-transparent">
            <div className="flex flex-col items-center gap-2 text-center">
              <BellIcon className="size-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
