# React-Anwendung zur Verwaltung von Jobs und Buchungen

## Übersicht

Diese React-Anwendung bietet eine Benutzeroberfläche zur Verwaltung von Jobs (Aufträgen) und deren zugehörigen Buchungen. Die Anwendung ermöglicht es, eine Liste von Jobs anzuzeigen, detaillierte Informationen zu jedem Job abzurufen und neue Buchungen zu erfassen. Zusätzlich werden die insgesamt gebuchten Stunden für jeden Job auf Basis von "Check-in" und "Check-out" Buchungen berechnet.

## Technologiestack

- **Frontend-Framework**: React
- **UI-Bibliothek**: Material UI
- **HTTP-Anfragen**: Axios
- **Datums- und Zeitberechnungen**: date-fns

## Aufbau der Anwendung

Die Anwendung besteht aus den folgenden Hauptkomponenten:

1. **Jobs**: Eine Hauptkomponente, die eine Liste von Jobs und die Möglichkeit zur Verwaltung von Jobdaten bietet.
2. **AddJobForm**: Ein Formular zur Hinzufügung eines neuen Jobs.
3. **ViewBookingsDialog**: Ein Dialog, der alle Buchungen für einen spezifischen Job anzeigt und die Gesamtzeit berechnet, die in den Buchungen erfasst wurde.

### Komponentendiagramm

```
Jobs
├── AddJobForm
└── ViewBookingsDialog
```

## Komponentenbeschreibung

### 1. Jobs-Komponente

Die `Jobs`-Komponente ist die Hauptkomponente der Anwendung, die die Liste der Jobs lädt und anzeigt. Jede Zeile der Jobtabelle bietet die Möglichkeit, einen Dialog zur Anzeige der zugehörigen Buchungen zu öffnen.

- **Datenabruf**: Die Liste der Jobs wird beim Laden der Komponente über einen `axios`-GET-Request abgerufen.
- **Aktionen**:
  - Öffnen des `ViewBookingsDialog`, um Buchungen für einen Job anzuzeigen.
  - Hinzufügen eines neuen Jobs über das `AddJobForm`.
- **Interaktive Elemente**: Jeder Job in der Tabelle hat eine Schaltfläche zum Anzeigen der Buchungen. Beim Klick auf diese Schaltfläche wird der `ViewBookingsDialog` für den entsprechenden Job geöffnet.

#### Wichtige Zustandsvariablen

- `selectedJobId`: Die ID des Jobs, dessen Buchungen im `ViewBookingsDialog` angezeigt werden sollen.
- `isDialogOpen`: Ein boolescher Zustand, der steuert, ob der `ViewBookingsDialog` angezeigt wird oder nicht.

#### Beispielcode-Snippet

```javascript
const handleRowClick = (jobId) => {
    setSelectedJobId(jobId);
    setIsDialogOpen(true);
};
```

### 2. AddJobForm-Komponente

Das `AddJobForm` ist ein Formular zur Erstellung neuer Jobs. Es wird als Dialog dargestellt und enthält verschiedene Eingabefelder, um die Details eines Jobs (z. B. Typ, Beschreibung, Start- und Enddatum) einzugeben.

- **Validierung**: Das Formular prüft, ob alle erforderlichen Felder ausgefüllt sind, bevor der Job hinzugefügt wird.
- **Datenübermittlung**: Nach der erfolgreichen Eingabe und Validierung wird der neue Job über einen POST-Request an den Server gesendet.

### 3. ViewBookingsDialog-Komponente

Die `ViewBookingsDialog`-Komponente zeigt alle Buchungen für einen ausgewählten Job an und berechnet die gesamte gebuchte Zeit basierend auf Paaren von "Check-in" und "Check-out"-Buchungen.

- **Anzeigedaten**:
  - Zeigt eine Tabelle mit den Feldern *Timestamp*, *Battery %* und *Check Type* für jede Buchung.
- **Berechnung der gebuchten Stunden**:
  - Buchungen werden nach *Check-in* und *Check-out* sortiert und in Paaren verarbeitet.
  - Die Dauer zwischen jedem *Check-in* und dem nächsten *Check-out* wird berechnet und zur Gesamtsumme addiert.
  - Die Gesamtdauer wird in Stunden und Minuten neben dem Titel `Bookings for Job X` angezeigt.

#### Wichtige Funktionen

- **calculateTotalBookedHours**: Diese Funktion durchläuft die Buchungen, um die gesamte gebuchte Zeit zwischen *Check-in* und *Check-out* zu berechnen.
- **Darstellung**: Der Dialog zeigt den Titel `Bookings for Job X - Total Booked Hours: Yh Zm` an, wobei `Y` und `Z` die summierten Stunden und Minuten darstellen.

#### Beispielcode zur Berechnung der gebuchten Stunden

```javascript
const calculateTotalBookedHours = (filteredBookings) => {
    let totalMinutes = 0;

    // Sortiere Buchungen nach Zeitstempel
    const sortedBookings = filteredBookings.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    let checkInTime = null;

    sortedBookings.forEach((booking) => {
      if (booking.check_type === "IN") {
        checkInTime = parseISO(booking.timestamp);
      } else if (booking.check_type === "OUT" && checkInTime) {
        const checkOutTime = parseISO(booking.timestamp);
        const minutes = differenceInMinutes(checkOutTime, checkInTime);
        totalMinutes += minutes;
        checkInTime = null;
      }
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setTotalBookedHours({ hours, minutes });
};
```

### 4. Styled Components

Für das Styling der Tabelle und spezifischer UI-Elemente wird `@mui/system` verwendet. Beispiel:

```javascript
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  fontWeight: "bold",
  textAlign: "center",
  color: theme.palette.text.primary,
  width: "33.33%",
}));
```

## Wichtige Bibliotheken und Pakete

- **axios**: Für die HTTP-Kommunikation mit dem Backend.
- **date-fns**: Zur Berechnung der Differenz zwischen Zeitstempeln für die Ermittlung der gebuchten Stunden.
- **Material UI**: Zur Bereitstellung der UI-Komponenten und Stile.

## Zusammenfassung

Diese Anwendung ermöglicht die Verwaltung und Überwachung von Jobs und deren Buchungen in einer übersichtlichen und effizienten Weise. Sie berechnet automatisch die gebuchten Stunden auf Basis von *Check-in* und *Check-out*-Ereignissen und stellt die Daten benutzerfreundlich dar. Die Struktur und Modularität der App erleichtern die Erweiterung und Wartung. 

